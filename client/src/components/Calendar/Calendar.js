import React, { useState, useEffect, useContext } from "react";
import moment from 'moment';
import Grid from '@material-ui/core/Grid'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import koLocale from '@fullcalendar/core/locales/ko';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "./Calendar.css";
import { ScheduleContext }  from '../../contexts/schedule.context';
import { MembersContext }  from '../../contexts/members.context';
import { DispatchContext } from '../../contexts/routine.context';
import Alert from '../items/Alert';

function Calendar () {
  const { schedules } = useContext(ScheduleContext); //title, start, id가 포함되어야 함.
  const { members } = useContext(MembersContext); 
  const dispatch = useContext(DispatchContext); 
  
  const [toggle, setToggle] = useState(false);
  const [evtColor, setEvtColor] = useState("orange")
  const [targetId, setTargetId] = useState("");
  const [scheduleList, setScheduleList] = useState([])
  const [evt, setEvt] = useState();
  const [exeMember, setMember] = useState([]);
  const [name, setName] = useState([]);
  const [start, setStart] = useState([]);

  // 내부 이벤트 초기화
   useEffect(() => {
    let scheduleList = schedules.map(schedule => {
     let color = "";
            if (schedule.finish_dncd === true) {
              color = "gray"
            }
            return { 
              title: schedule.name,
              id: members.phonenum,
              start: schedule.start, 
              finish_dncd: schedule.finish_dncd, 
              color: color  
            }
          })
          setScheduleList(scheduleList)
     }, [members, schedules])
  
 
  // 외부 이벤트 초기화
  useEffect (() => {
    const exeMember = members.map(cv => ({
      title: cv.name,
      id: cv.phonenum + cv.date,
    }))
    setMember(exeMember)
  }, []);


  // 달력에 표시될 스케줄 초기화

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
    const phonenum = eventClick.event.id.substr(0,11);  
    const date = moment(eventClick.event.start).format("YYYYMMDD");  
    setName(eventClick.event.extendedProps.name);
    setEvt(eventClick.event);
    handleTargetId(eventClick.event.id); 
    setToggle(!toggle); //alert창을 오픈
    setStart(moment(eventClick.event.start).format("MM월 DD일"));

    // 클릭시 1주일간의 해당 회원의 운동루틴을 받음
    fetch("/getWeekRoutineOfStu", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({phonenum, date}) 
    }).then((res) => {
      return res.json();
    }).then((routine) => { // 성공시 응답 0, 실패시 1
      console.log(routine)
      dispatch({type: "GETWEEK",
        name: eventClick.event.extendedProps.name,
        week: routine.week,
      })
    })
  }

    return (
      // 이벤트 창
      <div className="animated fadeIn p-4 demo-app">
      <Alert 
        toggle={toggle}
        setToggle={setToggle} 
        targetId={targetId} 
        handleRemove={handleRemove} 
        evt={evt} 
        name={name} 
        start={start}
      />
        <Grid container>
          <Grid item xs={0}>
            <div
              id="external-events"
              style={{
                padding: "10px",
                height: "500px",
                maxHeight: "-webkit-fill-available"
              }}
            >
              {/*<p align="center"><strong> 전체회원</strong></p>
               {exeMember.map(member => (
                <div className="fc-event" title={member.title} key={member.id} >
                  {member.title}
                </div>
              ))} */}
            </div>
          </Grid>
          <Grid item xs={11} >
            <div className="demo-app-calendar" id="mycalendartest">
              <FullCalendar
                height={500}
                mirrorSelector={'.gu-mirror'}
                selectable= {true}
                minTime={"09:00:00"}
                defaultView="timeGridWeek"
                header={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth, timeGridWeek, listWeek"
                }}
                locale={koLocale}
                rerenderDelay={10}
                eventDurationEditable={false}
                editable={true}
                droppable={true}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                //ref={calendarComponentRef}
                //weekends={this.state.calendarWeekends}
                events={scheduleList} // 달력안에 스케줄(events)이 표시된다.
                eventDrop={drop}
                // drop={this.drop}
                eventClick={eventClick}
                eventColor = {evtColor}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
}

export default Calendar;