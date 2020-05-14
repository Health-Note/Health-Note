import React, { useState } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  InputNumber,
  DatePicker,
  TimePicker
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="010">010</Option>
        <Option value="02">02</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const options = [
    { label: '월', value: '1' },
    { label: '화', value: '2' },
    { label: '수', value: '3' },
  ];

  function onChange(checkedValues) {
    // setChecked(checkedValues)
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '010',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="이름"
        rules={[
          {
            required: true,
            message: '회원 이름을 입력하세요',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="age"
        label="나이"
        rules={[
          {
            required: true,
            message: '회원 나이를 입력하세요',
          },{
            type: 'number',
            min: 0,
            max: 99,
            message: "나이가 좀 이상한데요?"
          }
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name="gender"
        label="성별"
        rules={[{ required: true, message: 'Please select your habitual residence!' },]}
      >
        <Radio.Group>
          <Radio value={0}>여</Radio>
          <Radio value={1}>남</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="phoneNum"
        label="연락처"
        rules={[{ required: true, message: '연락처를 입력하세요' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="totalPT"
        label={
          <span>
            결제PT수&nbsp;
            <Tooltip title="회원이 PT를 몇회 결제 하였나요?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[{ required: true, message: '결제 PT수를 입력하세요', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="DatePicker">
        <DatePicker />
      </Form.Item>

      {/*<Form.Item name="checkbox-group" label="선택요일" onChange={onChange}>*/}
      {/*  <Checkbox.Group>*/}
      {/*    <Row>*/}
      {/*      <Col span={3}>*/}
      {/*        <Checkbox value="1" style={{ lineHeight: '32px' }}>*/}
      {/*          월*/}
      {/*        </Checkbox>*/}
      {/*      </Col>*/}
      {/*      <Col span={3}>*/}
      {/*        <Checkbox value="2" style={{ lineHeight: '32px' }} disabled>*/}
      {/*          화*/}
      {/*        </Checkbox>*/}
      {/*      </Col>*/}
      {/*      <Col span={3}>*/}
      {/*        <Checkbox value="3" style={{ lineHeight: '32px' }}>*/}
      {/*          수*/}
      {/*        </Checkbox>*/}
      {/*      </Col>*/}
      {/*      <Col span={3}>*/}
      {/*        <Checkbox value="4" style={{ lineHeight: '32px' }}>*/}
      {/*          목*/}
      {/*        </Checkbox>*/}
      {/*      </Col>*/}
      {/*      <Col span={3}>*/}
      {/*        <Checkbox value="5" style={{ lineHeight: '32px' }}>*/}
      {/*          금*/}
      {/*        </Checkbox>*/}
      {/*      </Col>*/}
      {/*      <Col span={3}>*/}
      {/*        <Checkbox value="6" style={{ lineHeight: '32px' }}>*/}
      {/*          토*/}
      {/*        </Checkbox>*/}
      {/*      </Col>*/}
      {/*      <Col span={3}>*/}
      {/*        <Checkbox value="0" style={{ lineHeight: '32px' }}>*/}
      {/*          일*/}
      {/*        </Checkbox>*/}
      {/*      </Col>*/}
      {/*    </Row>*/}
      {/*  </Checkbox.Group>*/}
      {/*</Form.Item>*/}

      <Form.Item name="checkbox-group" label="선택요일" >
        <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
      </Form.Item>


      <Form.Item name="time-picker" label="TimePicker" rules={[{ type: 'object', required: true, message: 'Please select time!' }]}>
        <TimePicker />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;