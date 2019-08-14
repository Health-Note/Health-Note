import React, { useState, useEffect, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import momentPlugin from '@fullcalendar/moment';
//import Alert from "sweetalert2";
import { Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "./Calendar.css";
import { ScheduleContext }  from '../../contexts/schedule.context';
import Alert from '../items/Alert';

function Calendar () {
  const schedules = useContext(ScheduleContext); //title, start, id가 포함되어야 함.
  const [toggle, setToggle] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [scheduleList, setScheduleList] = useState([])

  useEffect(() => {
      let scheduleList = schedules.map(schedule => {
        const datePlusTime = schedule.date + " " + schedule.start_time;
        const start = moment(datePlusTime).format();
        return { title: schedule.name, id: schedule.phoneNum, finish_dncd: schedule.finish_dncd, start }
      })
      setScheduleList(scheduleList)
    }, []);

  // fullcalendar state에서 날짜형식은 ISO // 2017-03-16T17:40:00+09:00 이여야 함

  const handleTargetId = (id) => {
    setTargetId(id)
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

  /**
   * 날짜 : 2019-08-07
   * 작성자: 박종열
   * 기능 : 드래그 드롭시마다 사용자 이름, 폰넘버, 예전시간, 바뀐시간을 받아옴, 
   *        날짜변환: 20190804 + 1630 => 2019-08-04 16:30
   */

  const drop = (info) => {
    const name = info.event.title;
    const id = info.event.id;
    const oldDate = moment(info.oldEvent.start).format('YYYYMMDD');
    const changedDate = moment(info.event.start).format('YYYYMMDD'); // 한글시간으로 변화 필요
    const oldTime = moment(info.oldEvent.start).format('HHmm');
    const changedTime = moment(info.event.start).format('HHmm');
   
    fetch("/insertRoutine", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({phoneNum: id, oldDate, changedDate, oldTime, changedTime})
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
   *        삭제클릭시 phoneNum, date, startTime 서버로 보냄
   */
  const eventClick = eventClick => {
    const id = eventClick.event.id;
    setToggle(!toggle)
    handleTargetId(id);
    console.log(id)

    // 클릭시 ExerciseContext의 state들 설정 => 루틴 컴포넌트에서 fetch로 루틴정보 보낼 때 활용
    const date = moment(eventClick.event.start).format("YYYYMMDD"); // 20190807
   
    // 알림창

    // }).then(result => {
    //   if (result.value) {
    //     eventClick.event.remove(); // It will remove event from the calendar
    //     Alert.fire("삭제성공!", "스케줄에서 삭제되었습니다", "success");

    //     const name = eventClick.event.title;
    //     const id = eventClick.event.id;
    //     const date = moment(eventClick.event.start).format("YYYYMMDD"); // 20190807
    //     const startTime = moment(eventClick.event.start).format("HHmm"); // 1830
    
    //     fetch("/deletePT", {
    //       method: "POST",
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({phoneNum: id, date, startTime})
    //     }).then((res) => {
    //       return res.json()
    //     }).then((result) => { //성공시 응답 0, 실패시 1
    //       console.log("삭제결과:", result)
    //     })
    //   }
    // });
  };

  const eventReceive = (eventReceive) => {
    console.log(eventReceive)
    eventReceive.draggedEl.parentNode.removeChild(eventReceive.draggedEl);
  }

    return (
      // 이벤트 창
      <div className="animated fadeIn p-4 demo-app">
      <Alert toggle={toggle} setToggle={setToggle} id={targetId}/>
        <Row>
            <div
              id="external-events"
              style={{
                padding: "10px",
                width: "0%",
                height: "auto",
                maxHeight: "-webkit-fill-available"
              }}
            >
              <p align="center">
                <strong> Events</strong>
              </p>
            </div>

          <Col lg={12} sm={12} md={12}>
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
                eventReceive={eventReceive} //eventReceive는 외부에서 캘린더로 들어오는 객체를 받는 리시버이다.
                eventClick={eventClick}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
}


export default Calendar;