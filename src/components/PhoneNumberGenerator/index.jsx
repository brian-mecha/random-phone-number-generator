import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Icon, Table, Radio, Divider, Card } from 'antd';
import CsvDownloader from 'react-csv-downloader';
import './PhoneNumberGenerator.css'
import generatePhoneNumbers from '../../helpers/generateRandomNumber';

export default class PhoneNumberGenerator extends Component {
  state = {
    sortOrder: 'ASC',
    phoneNumbers: [],
    phoneNumberCount: 100,
    isDisabled: false,
    isLoading: false
  }

  radioOptions = [
    { label: 'ASC', value: 'ASC' },
    { label: 'DESC', value: 'DESC' }
  ];

  generateNewPhoneNumbers = () => {
    const { phoneNumbers, phoneNumberCount, sortOrder } = this.state;

    this.setState({ isLoading: true }, () => {
      const newNumbers = generatePhoneNumbers(phoneNumbers, phoneNumberCount, sortOrder);
      this.getNewPhoneNumbers(newNumbers);
    });
  }

  getNewPhoneNumbers = (data) => {
    this.setState({
      phoneNumbers: data,
      isLoading: false,
    });
  }

  handleRadioClick = ({ target: { value } }) => {
    this.setState({ sortOrder: value });
  }

  handleChange = ({ target: { value } }) => {
    if (value.length < 1 || value > 10000) {
      this.setState({ isDisabled: true });
    } else if (value.length >= 1) {
      this.setState({ isDisabled: false });
    }

    this.setState({ phoneNumberCount: value });
  }

  renderDownloadButton = () => {
    const { phoneNumbers } = this.state;

    const columns = [
      {
        id: 'id',
        displayName: 'No.'
      },
      {
        id: 'num',
        displayName: 'Phone Numbers'
      }
    ];

    const numbers = phoneNumbers.map((phoneNumber, index) => ({
      id: index + 1,
      num: phoneNumber.toString(),
    }));

    return (
      <CsvDownloader
        datas={numbers}
        filename="new-phone-numbers"
        columns={columns}
      />
    );
  }

  getMinMaxValue = (numbers, type) => {
    if ( numbers.length < 1) return;

    if (type === 'min') {
      return `0${Math.min(...numbers)}`;
    } else if (type === 'max') {
      return `0${Math.max(...numbers)}`;
    }
  }

  render() {
    const { isDisabled, isLoading, phoneNumberCount, phoneNumbers, sortOrder } = this.state;

    return (
      <React.Fragment>
        <h1>Phone Number Generator</h1>
        <Row>
          <Col span={24}>
            <Form className="form" layout="inline">
              <Form.Item>
                <Input placeholder="Phone number count" type="number" value ={phoneNumberCount} onChange={this.handleChange}/>
              </Form.Item>

              <Form.Item>
                <Radio.Group
                  options={this.radioOptions}
                  onChange={this.handleRadioClick}
                  value={this.state.sortOrder}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" onClick={this.generateNewPhoneNumbers} disabled={isDisabled} loading={isLoading}>
                  <Icon type="sliders" /> Generate
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            <Row>
              <Col span={24}>
              <div className="download-button">
                    {this.renderDownloadButton()}
                  </div>
              </Col>
            </Row>

            <Row type="flex" justify="space-around">
              <Col span={16}>
                <Table columns={[{title: 'Phone Numbers'}]} dataSource={phoneNumbers} bordered />
              </Col>

              <Col span={6}>
                <Card title="Statistics" bordered={false} >
                  <dl>
                    <dt><strong>Phone Numbers Count:</strong></dt>
                    <dd>{phoneNumberCount || '--'}</dd>
                    <dt><strong>Order:</strong></dt>
                    <dd>{sortOrder || '--'}</dd>
                    <dt><strong>Minimum:</strong></dt>
                    <dd>{this.getMinMaxValue(phoneNumbers, 'min') || '--'}</dd>
                    <dt><strong>Maximum:</strong></dt>
                    <dd>{this.getMinMaxValue(phoneNumbers, 'max') || '--'}</dd>
                  </dl>
                </Card>
              </Col>
            </Row>

          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
