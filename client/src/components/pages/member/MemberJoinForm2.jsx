import React, { useState, useContext } from 'react';
import {
  Descriptions,
  Input,
  TimePicker,
  DatePicker,
  Radio,
  Button,
  Form,
  Row,
  Col,
} from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import moment from 'moment';
import DaySelect from './CheckBox';
import { MembersContext } from '../../../contexts/members.context';
import { ScheduleContext } from '../../../contexts/schedule.context';

const format = 'HH:mm';

const options = [
  { label: '월', value: 1 },
  { label: '화', value: 2 },
  { label: '수', value: 3 },
  { label: '목', value: 4 },
  { label: '금', value: 5 },
  { label: '토', value: 6 },
  { label: '일', value: 7 },
];

const MemberJoinForm2 = ({ form, toggle }) => {
  const { addMember } = useContext(MembersContext);
  const { setSchedule } = useContext(ScheduleContext);

  // const [name, handleName] = useInputState("");
  // const [phonenum, handlePhoneNum] = useInputState("");
  // const [unusedpt, handleUnusept] = useInputState("");
  // const [gender, handleGender] = useInputState("");
  // const [height, handleHeight] = useInputState("");
  const [startDate] = useState(moment());
  const [days, setDays] = useState([]);
  const [mon, setMon] = useState(null);
  const [tue, setTue] = useState(null);
  const [wed, setWed] = useState(null);
  const [thu, setThu] = useState(null);
  const [fri, setFri] = useState(null);
  const [sat, setSat] = useState(null);
  const [sun, setSun] = useState(null);
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      console.log(values);
      if (!err) {
        addMember({
          ...values,
          startDate: moment(startDate).format('YYYY-MM-DD'),
        });
        setTimeout(() => {
          setSchedule({
            unusedpt: values.unusedpt,
            startDate: moment(startDate).format('YYYY-MM-DD'),
            days,
            startTime: [mon, tue, wed, thu, fri, sat, sun].filter(cv => cv), // true만 고르기
            phonenum: values.phonenum,
          });
        }, 2000);
      }
    });
  };

  const handleCheckBox = checkedValues => {
    console.log(checkedValues);
    !checkedValues.includes(1) && setMon(null);
    !checkedValues.includes(2) && setTue(null);
    !checkedValues.includes(3) && setWed(null);
    !checkedValues.includes(4) && setThu(null);
    !checkedValues.includes(5) && setFri(null);
    !checkedValues.includes(6) && setSat(null);
    !checkedValues.includes(7) && setSun(null);
    setDays(checkedValues);
  };

  const handleMon = time => {
    console.log(moment(time).format('HHmm'));
    setMon(time);
  };
  const handleTue = time => {
    setTue(time);
  };
  const handleWed = time => {
    setWed(time);
  };
  const handleThu = time => {
    setThu(time);
  };
  const handleFri = time => {
    setFri(time);
  };
  const handleSat = time => {
    setSat(time);
  };
  const handleSun = time => {
    setSun(time);
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (mon) {
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Descriptions
        title="회원등록"
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label="이름">
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '이름을 입력하세요' }],
            })(<Input />)}
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item label="성별">
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: '성별을 선택하세요' }],
            })(
              <Radio.Group>
                <Radio value={0}>여</Radio>
                <Radio value={1}>남</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item label="연락처">
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator('phonenum', {
              rules: [{ required: true, message: '핸드폰 번호를 입력하세요' }],
            })(<Input />)}
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item label="시작일">
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator('start_date', {
              initialValue: startDate,
              rules: [{ required: true, message: '시작일을 입력하세요' }],
            })(<DatePicker locale={locale} />)}
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item label="등록PT수">
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator('unusedpt', {
              rules: [{ required: true, message: '등록PT수를 입력하세요' }],
            })(<Input />)}
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item label="키">
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator('height', {
              rules: [{ required: true, message: '키를 입력하세요' }],
            })(<Input />)}
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item label="요일" span={3}>
          <Form.Item style={{ margin: 0 }}>
            <DaySelect
              setDays={setDays}
              options={options}
              handleCheckBox={handleCheckBox}
            />
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item label="시간" span={3}>
          <Row type="flex" justify="start">
            <>
              {days.map((cv, i) => (
                <Form.Item style={{ margin: 0 }}>
                  <span>
                    {(cv === 1 && '월') ||
                      (cv === 2 && '화') ||
                      (cv === 3 && '수') ||
                      (cv === 4 && '목') ||
                      (cv === 5 && '금') ||
                      (cv === 6 && '토') ||
                      (cv === 7 && '일')}
                  </span>
                  {getFieldDecorator('day' + +cv, {
                    rules: [{ required: true, message: '시간을 입력하세요' }],
                  })(
                    <TimePicker
                      style={{ margin: '3px' }}
                      key={cv}
                      minuteStep={30}
                      disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8]}
                      format={format}
                    />
                  )}
                </Form.Item>
              ))}
            </>
          </Row>
        </Descriptions.Item>
      </Descriptions>
      <Row type="flex" justify="end" align="center">
        <Col>
          <Form.Item>
            <Button onClick={toggle}>닫기</Button>
            <Button type="primary" htmlType="submit">
              등록하기
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
const WrappedMemberJoinForm2 = Form.create({ name: 'MemberJoinForm2' })(
  MemberJoinForm2
);
export default WrappedMemberJoinForm2;
