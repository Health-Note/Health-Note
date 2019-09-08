import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import koLocale from '@fullcalendar/core/locales/ko';
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import moment from 'moment';
import { Col, Row } from "reactstrap";
import { MembersContext }  from '../../contexts/members.context';
import { ScheduleContext }  from '../../contexts/schedule.context';
import Alert from '../items/Alert';

const MemberCalendar = () => {

  const schedules = useContext(ScheduleContext); //title, start, id가 포함되어야 함.
  const { members, getMember } = useContext(MembersContext); 

  const [evtColor, setEvtColor] = useState("orange");
  const [targetId, setTargetId] = useState("");
  const [scheduleList, setScheduleList] = useState([]);
  const [evt, setEvt] = useState();
  const [exeMember, setMember] = useState([]); // 외부
  const [name, setName] = useState([]);
  const [start, setStart] = useState([]);
  
    // state에서 날짜형식은 ISO // 2017-03-16T17:40:00+09:0
    // const calendarEvents: [{
    //         title: "kim",
    //         start: new Date("2019-09-04 16:00"),
    //         id: "01011112222",
    //         phonenum: "9999999999"
    //     },{
    //         title: "My Favorite Murder",
    //         start: moment("20190904 1630").format(),
    //         id: "01045678945"
    //     }],
    // events: [{ // 외부이벤트
    //     title: "kim",
    //     id: "01011112222",
    //     member_id: "9999999999"
    // }]
     
  useEffect(()=>{
    
    console.log("componentDidUpdate_members", members);
      const newMember = members.map(member => {
        return { title: member.name, id: member.member_id, member_id: member.member_id }
      });
      setMember(newMember);
  }, [members]) 
  
  useEffect(()=>{
    getMember();
/**
 * 날짜 : 2019-08-07
 * 작성자: 박종열
   * 기능 : 서버에서 사용자 이름, 폰넘버, 시작시간을 받아옴
   * adding dragable properties to external events through javascript
   */
    
  // fetch("/getData", {
  //     method: "get",
  //   headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //   }
  // }).then((res) => {
  //     return res.json()
  // }).then((data) => {
  //     let meberList = data.members.map(member => {
  //         const startReady = member.startDay + " " + member.startTime;
  //     const start = moment(startReady).format();
  //     return { title: member.name, id: member.phonenum, start }
  // })
  //   console.log(meberList)
  //   this.setState({
  //       calendarEvents: this.state.calendarEvents.concat(meberList)
  //     })
  // })

    let draggableEl = document.getElementById("allMembers");
    new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function(eventEl) {
            let title = eventEl.getAttribute("title");
            let id = eventEl.getAttribute("data");
            let phonenum = eventEl.getAttribute("phonenum");
            return {
                title: title,
                id: id,
                phonenum: phonenum
            };
        }
    });  
  }, []);

  const eventReceive = eventReceive => {
    const start_time = moment(eventReceive.event.start).format("HHmm");
    const member_id = eventReceive.event.id;
    let day;
    
    switch (moment(eventReceive.event.start).format("dddd")) {
        case "Monday":    day = 0; break;
        case "Thuseday":  day = 1; break; 
        case "Wednesday": day = 2; break; 
        case "Thursday":  day = 3; break;
        case "Friday":    day = 4; break;
        case "Saturday":  day = 5; break;
        case "Sunday":    day = 6; break;
        default: return null;
    }  

    //setFixedSchedule(start_time, member_id, day);
  };
    
  /**
   * 날짜 : 2019-08-07
   * 작성자: 박종열
   * 기능 : 드래그 드롭시마다 사용자 이름, 폰넘버, 예전시간, 바뀐시간을 받아옴, 
   *        날짜변환: 20190804 + 1630 => 2019-08-04 16:30
   */
  const drop = (info) => {
      console.log(info.event.id)
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
      body: JSON.stringify({phonenum: id, oldDate, changedDate, oldTime, changedTime})
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
    // 클릭시 ExerciseContext의 state들 설정 => 루틴 컴포넌트에서 fetch로 루틴정보 보낼 때 활용
    const id = eventClick.event.id;
    const name = eventClick.event.title;
    const date = moment(eventClick.event.start).format("YYYYMMDD"); // 20190807
    const startTime = moment(eventClick.event.start).format("HHmm"); // 1830

    // 알림창
        eventClick.event.remove(); // It will remove event from the calendar
  }

  return (
      <>
      <Alert />
    <div className="animated fadeIn p-4 demo-app">
      <Row>
        <Col lg={3} sm={3} md={3}>
          <div
            id="allMembers"
            style={{ // 외부 상자 타이틀 스타일
              padding: "10px",
              width: "80%",
              height: "auto",
              maxHeight: "-webkit-fill-available",
            }}
          >
            <p align="center"><strong> 전체회원</strong></p>
            {exeMember.map(event => (
              <div className="fc-event" title={event.title} data={event.id} key={event.id} >
                {event.title}
              </div>
            ))}
          </div>
        </Col>

        {/* 달력 본체 */}
        <Col lg={9} sm={9} md={9}>
          <div className="demo-app-calendar" id="mycalendartest">
            <FullCalendar
              columnHeaderFormat={{
                  weekday:"short" // 주간시간표로 만들어줌.
              }}
              locale={koLocale}
              displayEventTime={true}
              all-day={false}
              mirrorSelector={'.gu-mirror'}
              selectable= {true}
              minTime={"09:00:00"}
              defaultView="timeGridWeek"
              header={false}
              rerenderDelay={10}
              eventDurationEditable={false}
              editable={true}
              droppable={true}
              plugins={[timeGridPlugin, interactionPlugin]}
              // events={calendarEvents}
              eventDrop={drop}
              // drop={this.drop}
              eventReceive={eventReceive}
              eventClick={eventClick}
            />
          </div>
        </Col>
      </Row>
    </div>
    </>
  );
  }

export default MemberCalendar;