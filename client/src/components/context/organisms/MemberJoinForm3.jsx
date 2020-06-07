import React, { useContext, useState } from 'react';
import locale from 'antd/es/date-picker/locale/ko_KR';
import {
  Form,
  Input,
  Tooltip,
  Select,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  InputNumber,
  DatePicker,
  TimePicker
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { MembersContext } from '../../../contexts/members.context';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    lg: { span: 24 },
    xl: { span: 8}
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    lg: { span: 24 },
    xl: { span: 18}
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 8,
    },
    sm: {
      span: 16,
      offset: 0,
    },
    me: {
      span: 16,
      offset: 0,
    },
    lg: {
      span: 24,
      offset: 0,
    },
    xl: {
      span: 24,
      offset: 8,
    }
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const { addMember } = useContext(MembersContext);

  const onFinish = values => {
    const days = [];
    console.log('Received values of form: ', values);
    values.days.forEach((day, i) => {
      days.push({
        day: parseInt(day),
        hour: parseInt(values.startTime.format('HH')),
        min: parseInt(values.startTime.format('mm')),
      });
    });

    const member = {};
    member.memberName = values.name;
    member.age = values.age;
    member.gender = parseInt(values.gender);
    member.phoneNum = values.prefix + values.phoneNum;
    member.totalPT = parseInt(values.totalPT);
    member.startTime = values.startTime.format('YYYY-MM-DD').toString();
    member.endTime = values.startTime.add(1, 'hours').format('YYYY-MM-DD').toString();
    member.days = days;
    addMember(member);
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
  const [check, setCheck] = useState([]);

  const options = [
    { label: '일', value: '0' },
    { label: '월', value: '1' },
    { label: '화', value: '2' },
    { label: '수', value: '3' },
    { label: '목', value: '4' },
    { label: '금', value: '5' },
    { label: '토', value: '6' },
  ];

  function onChange(checkedValues) {
    setCheck(checkedValues)
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
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
        name="phoneNum"
        label="연락처"
        rules={[{ required: true, message: '연락처를 입력하세요' }]}
      >
        <Input addonBefore={prefixSelector} placeholder={" - 를 제외하고 입력하세요"} style={{ width: '100%' }} />
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
        rules={[{ required: true, message: '성별을 선택하세요' },]}
      >
        <Radio.Group>
          <Radio value={0}>여</Radio>
          <Radio value={1}>남</Radio>
        </Radio.Group>
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
        rules={[{
          required: true,
          message: '결제 PT수를 입력하세요',
        }, {
          type: 'number',
          min: 1,
          max: 100,
          message: '범위(1~100)를 넘어섰습니다.',
        }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name="startTime" label="시작일">
        <DatePicker locale={locale}/>
      </Form.Item>
      <Form.Item name="days" label="요일">
        <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange}/>
      </Form.Item>
      {check.map(time => (
        <Form.Item name={"time_" + time} label={options[time].label} rules={[{ type: 'object', required: true, message: 'Please select time!' }]}>
          <TimePicker minuteStep={30} format = 'HH:mm'/>
        </Form.Item>
      ))}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
