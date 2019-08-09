import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import momentPlugin from '@fullcalendar/moment';
import Alert from "sweetalert2";
import { Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "./Calendar.css";
import { ExerciseContext }  from '../../contexts/ExerciseContext';

class Calendar extends Component {
    // state에서 날짜형식은 ISO // 2017-03-16T17:40:00+09:0
  static contextType = ExerciseContext;
  
  
  state = {
    calendarEvents: [
      {
        title: "kim",
        start: new Date("2019-08-04 16:00"),
        id: "01011112222"
      },
      {
        title: "My Favorite Murder",
        start: moment("20190804 1630").format(),
        id: "01045678945"
      }
    ],
    events: [
      { title: "Event 1", id: "1" },
      { title: "Event 2", id: "2" },
      { title: "Event 3", id: "3" },
      { title: "Event 4", id: "4" },
      { title: "Event 5", id: "5" }
    ]
  };
  
  /**
   * 날짜 : 2019-08-07
   * 작성자: 박종열
   * 기능 : 서버에서 사용자 이름, 폰넘버, 시작날짜, 시작시간을 받아옴
   * adding dragable properties to external events through javascript
   */

  componentDidMount() {
    fetch("/getData", {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      let meberList = data.members.map(member => {
        const startReady = member.startDay + " " + member.startTime;
        const start = moment(startReady).format();
        return { title: member.name, id: member.phoneNum, start }
      })
      console.log(meberList)
      this.setState({
        calendarEvents: this.state.calendarEvents.concat(meberList)
      })
    })

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
  }

  /**
   * 날짜 : 2019-08-07
   * 작성자: 박종열
   * 기능 : 드래그 드롭시마다 사용자 이름, 폰넘버, 예전시간, 바뀐시간을 받아옴, 
   *        날짜변환: 20190804 + 1630 => 2019-08-04 16:30
   */

  drop = (info) => {
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
      return res.json()
    }).then((result) => { //성공시 응답 0, 실패시 1
      console.log(result)
    })
  }



 /**
  * 날짜 : 2019-08-07
   * 작성자: 박종열
   * 기능 : 캘린더에서 스케줄 클릭시 얼러트창 생성
   *        삭제클릭시 phoneNum, date, startTime 서버로 보냄
   */
  eventClick = eventClick => {
    
    // 클릭시 ExerciseContext의 state들 설정 => 루틴 컴포넌트에서 fetch로 루틴정보 보낼 때 활용
    const id = eventClick.event.id;
    const date = moment(eventClick.event.start).format("YYYYMMDD"); // 20190807
    const { setId, setDate } = this.context;
    setId(id); //폰넘버
    setDate(date); // 해당일

    // 알림창
    Alert.fire({
      title: eventClick.event.title,
      html:
        `<div class="table-responsive">
      <table class="table">
      <tbody>
      <tr >
      <td>이름</td>
      <td><strong>` +
        eventClick.event.title +
        `</strong></td>
      </tr>
      <tr >
      <td>시작</td>
      <td><strong>
      ` +
        eventClick.event.start +
        `
      </strong></td>
      </tr>
      </tbody>
      </table>
      </div>`,

      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "닫기"
    }).then(result => {
      if (result.value) {
        eventClick.event.remove(); // It will remove event from the calendar
        Alert.fire("삭제성공!", "스케줄에서 삭제되었습니다", "success");

        const name = eventClick.event.title;
        const id = eventClick.event.id;
        const date = moment(eventClick.event.start).format("YYYYMMDD"); // 20190807
        const startTime = moment(eventClick.event.start).format("HHmm"); // 1830
    
        fetch("/deletePT", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({phoneNum: id, date, startTime})
        }).then((res) => {
          return res.json()
        }).then((result) => { //성공시 응답 0, 실패시 1
          console.log("삭제결과:", result)
        })
      }
    });
  };

  render() {

    return (
      // 이벤트 창
      <div className="animated fadeIn p-4 demo-app">
        <Row>
          <Col lg={3} sm={3} md={3}>
            <div
              id="external-events"
              style={{
                padding: "10px",
                width: "80%",
                height: "auto",
                maxHeight: "-webkit-fill-available"
              }}
            >
              <p align="center">
                <strong> Events</strong>
              </p>
              {this.state.events.map(event => (
                <div
                  className="fc-event"
                  title={event.title}
                  data={event.id}
                  key={event.id}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </Col>

          <Col lg={9} sm={9} md={9}>
            <div className="demo-app-calendar" id="mycalendartest">
              <FullCalendar
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
                ref={this.calendarComponentRef}
                weekends={this.state.calendarWeekends}
                events={this.state.calendarEvents}
                eventDrop={this.drop}
                // drop={this.drop}
                eventReceive={this.eventReceive}
                eventClick={this.eventClick}
                // selectable={true}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Calendar;