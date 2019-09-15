import React, { useState, useContext, useCallback } from "react";
import {
  Descriptions,
  Badge,
  Input,
  TimePicker,
  DatePicker,
  Radio,
  Button,
  Form,
  Row,
  Col
} from "antd";
import locale from "antd/es/date-picker/locale/ko_KR";
import moment from "moment";
import DaySelect from "./CheckBox";
import useInputState from "../../hooks/useInputState";
import { MembersContext } from "../../contexts/members.context";
import { ScheduleContext } from "../../contexts/schedule.context";

const format = "HH:mm";
const weeks = ["월", "화", "수", "목", "금", "토", "일"];

const options = [
  { label: "월", value: 1 },
  { label: "화", value: 2 },
  { label: "수", value: 3 },
  { label: "목", value: 4 },
  { label: "금", value: 5 },
  { label: "토", value: 6 },
  { label: "일", value: 7 }
];

const MemberJoinForm2 = ({ form }) => {
  const { addMember, error } = useContext(MembersContext);
  const { setSchedule } = useContext(ScheduleContext);

  // const [name, handleName] = useInputState("");
  // const [phonenum, handlePhoneNum] = useInputState("");
  // const [unusedpt, handleUnusept] = useInputState("");
  // const [gender, handleGender] = useInputState("");
  // const [height, handleHeight] = useInputState("");
  const [start_date, setStartDate] = useState(moment());
  const [days, setDays] = useState([]);
  const [start_time, setStartTime] = useState(moment("15:00", format));
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
          start_date: moment(start_date).format("YYYY-MM-DD")
        });
        setTimeout(() => {
          setSchedule({
            unusedpt: values.unusedpt,
            start_date: moment(start_date).format("YYYY-MM-DD"),
            days,
            start_time: [mon, tue, wed, thu, fri, sat, sun].filter(cv => cv),
            phonenum: values.phonenum
          });
        }, 2000);
      }
    });
  };

  const handleCheckBox = checkedValues => {
    !checkedValues.includes(1) && setMon(null);
    !checkedValues.includes(2) && setTue(null);
    !checkedValues.includes(3) && setWed(null);
    !checkedValues.includes(4) && setThu(null);
    !checkedValues.includes(5) && setFri(null);
    !checkedValues.includes(6) && setSat(null);
    !checkedValues.includes(7) && setSun(null);
    setDays(checkedValues);
  };

  const handleMon = (time, timeString) => {
    console.log(moment(time).format("HHmm"))
    setMon(time);
  };
  const handleTue = (time, timeString) => {
    setTue(time);
  };
  const handleWed = (time, timeString) => {
    setWed(time);
  };
  const handleThu = (time, timeString) => {
    setThu(time);
  };
  const handleFri = (time, timeString) => {
    setFri(time);
  };
  const handleSat = (time, timeString) => {
    setSat(time);
  };
  const handleSun = (time, timeString) => {
    setSun(time);
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
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "이름을 입력하세요" }]
            })(<Input />)}
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item label="성별">
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator("gender", {
              rules: [{ required: true, message: "성별을 선택하세요" }]
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
            {getFieldDecorator("phonenum", {
              rules: [{ required: true, message: "핸드폰 번호를 입력하세요" }]
            })(<Input />)}
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item label="시작일">
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator("start_date", {
              initialValue: start_date,
              rules: [{ required: true, message: "시작일을 입력하세요" }]
            })(<DatePicker locale={locale} />)}
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item label="등록PT수">
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator("unusedpt", {
              rules: [{ required: true, message: "등록PT수를 입력하세요" }]
            })(<Input />)}
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item label="키">
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator("height", {
              rules: [{ required: true, message: "키를 입력하세요" }]
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
          {options.map((cv, i) => (
            <>
              <p>{cv.label}</p>
              <TimePicker
                key={i}
                defaultValue={start_time}
                value={
                  (cv.label === "월" && mon) ||
                  (cv.label === "화" && tue) ||
                  (cv.label === "수" && wed) ||
                  (cv.label === "목" && thu) ||
                  (cv.label === "금" && fri) ||
                  (cv.label === "토" && sat) ||
                  (cv.label === "일" && sun)
                }
                onChange={
                  (cv.label === "월" && handleMon) ||
                  (cv.label === "화" && handleTue) ||
                  (cv.label === "수" && handleWed) ||
                  (cv.label === "목" && handleThu) ||
                  (cv.label === "금" && handleFri) ||
                  (cv.label === "토" && handleSat) ||
                  (cv.label === "일" && handleSun)
                }
                format={format}
                disabled={days.includes(i+1) ? false : true}
              />
            </>
          ))}
        </Descriptions.Item>
      </Descriptions>
      <Row type="flex" justify="end">
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              등록하기
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
const WrappedMemberJoinForm2 = Form.create({ name: "MemberJoinForm2" })(
  MemberJoinForm2
);
export default WrappedMemberJoinForm2;
