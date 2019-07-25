import React from 'react';
import { shallow, mount } from 'enzyme';

import PhoneNumberGenerator from './';

describe('Phone Number generator', () => {
  const props = {
    handleChange: jest.fn(),
    generateNewPhoneNumbers: jest.fn()
  }
  const wrapper = mount(<PhoneNumberGenerator {...props}/>)

  it('renders PhoneNumberGenerator properly', () => {
    const tree = shallow(
      <PhoneNumberGenerator {...props} />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('simulates change on the phone numbers count input box', () => {
    const input = wrapper.find('input[type="number"]');
    expect(input.instance().value).toEqual('100');

    input.simulate('change', { target: { value: 2000 }});
    expect(input.instance().value).toEqual('2000');
  });

  it('simulates change on the sort order radio buttons', () => {
    const radio = wrapper.find('input[type="radio"]');
    expect(radio.first().instance().value).toEqual('ASC');

    wrapper.find('.ant-radio-input').last().simulate('change');
    expect(wrapper.instance().state.sortOrder).toEqual('DESC');
  });

  it('simulates a click on the generate button', () => {
    const button = wrapper.find('#generate-button').last();
    const table = wrapper.find('.ant-empty');
    
    expect(button.length).toBe(1);
    button.simulate('click');
    expect(table.length).toBe(1);
  });
});
