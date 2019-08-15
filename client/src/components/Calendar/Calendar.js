import React, { useState, useEffect, useContext } from "react";
import moment from 'moment';
import { Col, Row } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import momentPlugin from '@fullcalendar/moment';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "./Calendar.css";
import { ScheduleContext }  from '../../contexts/schedule.context';
import { MembersContext }  from '../../contexts/members.context';
import Alert from '../items/Alert';

function Calendar () {
  const schedules = useContext(ScheduleContext); //title, start, id가 포함되어야 함.
  const members = useContext(MembersContext); 
  const [toggle, setToggle] = useState(false);
  const [evtColor, setEvtColor] = useState("orange")
  const [targetId, setTargetId] = useState("");
  const [scheduleList, setScheduleList] = useState([])
  const [evt, setEvt] = useState();
  const [exeMember, setMember] = useState([]);

  // 내부 이벤트 초기화
  // useEffect(() => {
  //     fetch("/sendBasicsForSchedule", {
  //         method: "get",
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         }
  //       }).then((res) => {
  //         return res.json();
  //       }).then((schedules) => {
  //         let scheduleList = schedules.map(schedule => {
  //           const datePlusTime = schedule.date + " " + schedule.start_time;
  //           const start = moment(datePlusTime).format();
  //           let color = "";
  //           if (schedule.finish_dncd === true) {
  //             color = "gray"
  //           }
  //           return { 
  //             title: schedule.name,
  //             id: schedule.phonenum + schedule.date,
  //             phonenum: schedule.phonenum, 
  //             finish_dncd: schedule.finish_dncd, 
  //             start, 
  //             color: color  
  //           }
  //         })
  //       })
  //       setScheduleList(scheduleList)
  // }, [toggle])
 
  // 외부 이벤트 초기화
  useEffect (() => {
    const exeMember = members.map(cv => ({
      title: cv.name,
      id: cv.phonenum + cv.date,
    }))
    setMember(exeMember)
  }, [])


  useEffect(() => {
        let parsedScheduleList = schedules.map(schedule => {
        const id = schedule.phonenum + schedule.date;
        const datePlusTime = schedule.date + " " + schedule.start_time;
        const start = moment(datePlusTime).format();
        let color = "";
        if (schedule.finish_dncd === true) {
          color = "gray"
        }
        
        return { 
          id,
          start, 
          title: schedule.name,
          color: color,  
          phonenum: schedule.phonenum, 
          finish_dncd: schedule.finish_dncd, 
        }
      })
      setScheduleList(parsedScheduleList)
    }, [toggle]);

    const handleTargetId = (id) => {
  // fullcalendar state에서 날짜형식은 ISO // 2017-03-16T17:40:00+09:00 이여야 함

    setTargetId(id)
  }

  const handleRemove = () => { // alert.js에서 실행됨
    const phonenum = evt.id.substr(0, 11);
    const date = moment(evt.start).format("YYYYMMDD"); 
    const start_time = moment(evt.start).format("HHmm"); 
    console.log(phonenum, date, start_time)
    evt.remove()
    fetch("/deletePT", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({phonenum, date, start_time})
    }).then((res) => {
      return res.json()
    }).then((result) => { //성공시 응답 0, 실패시 1
      console.log("삭제결과:", result)
    })
  }
  
  /**
   * 날짜 : 2019-08-07
   * 작성자: 박종열
   * 기능 : 서버에서 사용자 이름, 폰넘버, 시작날짜, 시작시간을 받아옴
   * adding dragable properties to external events through javascript
   */

  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        return {
          title: title,
          id: id
        };
      }
    });
  }, [])


  // 서버에서 추가로 가변테이블에 들어오는 것을 받는 라우터를 만들어야 함
  const eventReceive = (eventReceive) => {
    const startTime = moment(eventReceive.event.start).format("HHmm");
    const phonenum = eventReceive.event.id;
    const date = moment(eventReceive.event.start).format("YYMMDD");
    const start_time = moment(eventReceive.event.start).format("hhmm");
  }

  /**
   * 날짜 : 2019-08-07
   * 작성자: 박종열
   * 기능 : 드래그 드롭시마다 사용자 이름, 폰넘버, 예전시간, 바뀐시간을 받아옴, 
   *        날짜변환: 20190804 + 1630 => 2019-08-04 16:30
   */
  const drop = (info) => {
    const phonenum = info.event.id.substr(0,11);                        // 폰넘버
    const befor_date = moment(info.oldEvent.start).format('YYYYMMDD');  // 변경 전 날짜
    const after_date = moment(info.event.start).format('YYYYMMDD');     // 변경 후 날짜
    const start_time = moment(info.event.start).format('HHmm');         // 변경 후 시작 시간
    const end_time = moment(info.event.end).format('HHmm');             // 변경 후 종료 시간
    const finish_dncd = info.event.extendedProps.finish_dncd ? 1 : 0    // 완료 여부 (1: true, 0: false)
   
    fetch("/insertRoutine", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({phonenum, befor_date, after_date, start_time, end_time, finish_dncd}) 
    }).then((res) => {
      return res.json();
    }).then((result) => { // 성공시 응답 0, 실패시 1
      console.log(result);
    })
  }

 /**
  * 날짜 : 2019-08-07
   * 작성자: 박종열
   * 기능 : 캘린더에서 스케줄 클릭시 얼러트창 생성
   *        삭제클릭시 phonenum, date, startTime 서버로 보냄
   */
  const eventClick = eventClick => {
    setEvt(eventClick.event);
    handleTargetId(eventClick.event.id); 
    setToggle(!toggle); //alert창을 오픈
    
    // 클릭시 ExerciseContext의 state들 설정 => 루틴 컴포넌트에서 fetch로 루틴정보 보낼 때 활용
    const date = moment(eventClick.event.start).format("YYYYMMDD"); // 20190807
  };

    return (
      // 이벤트 창
      <div className="animated fadeIn p-4 demo-app">
      <Alert toggle={toggle} setToggle={setToggle} targetId={targetId} handleRemove={handleRemove} evt={evt}/>
        <Row>
          <Col lg={3} md={3} sm={3}>
            <div
              id="external-events"
              style={{
                padding: "10px",
                width: "80%",
                height: "500px",
                maxHeight: "-webkit-fill-available"
              }}
            >
              <p align="center"><strong> 전체회원</strong></p>
              {exeMember.map(member => (
                <div className="fc-event" title={member.title} key={member.id} >
                  {member.title}
                </div>
              ))}
            </div>
          </Col>     
          <Col lg={9} sm={9} md={9}>
            <div className="demo-app-calendar" id="mycalendartest">
              <FullCalendar
              height={500}
               mirrorSelector={'.gu-mirror'}
                selectable= {true}
                minTime={"06:00:00"}
                defaultView="dayGridMonth"
                header={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}
                rerenderDelay={10}
                eventDurationEditable={false}
                editable={true}
                droppable={true}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentPlugin]}
                //ref={calendarComponentRef}
                //weekends={this.state.calendarWeekends}
                events={scheduleList} // 달력안에 스케줄(events)이 표시된다.
                eventDrop={drop}
                // drop={this.drop}
                eventClick={eventClick}
                eventColor = {evtColor}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
}

export default Calendar;