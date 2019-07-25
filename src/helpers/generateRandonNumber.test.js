import generatePhoneNumbers, { sortPhoneNumbers } from './generateRandomNumber'

describe('Generate number helper function', () => {

  it('sorts numbers in defined order', () => {
    const numbers = generatePhoneNumbers([], 100, 'DESC');
    expect(numbers.length).toEqual(100);
    expect(Boolean(numbers[0] - numbers[99])).toEqual(true);

    const sorted = sortPhoneNumbers(numbers, 'ASC');
    expect(Boolean(sorted[99] - sorted[0])).toBe(true);
  });
});
