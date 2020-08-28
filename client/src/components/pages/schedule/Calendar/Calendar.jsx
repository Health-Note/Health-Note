import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col} from 'antd';
import moment from 'moment';
import '@fullcalendar/core/main.css';
import '@fullcalendar/timegrid/main.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import useToggle from '../../../../hooks/useToggle';
import { message } from 'antd';
import './Calendar.css';
import seedColors from '../../../../utils/seedColors';
import { GET_SCHEDULES_REQUEST } from '../../../../reducers/types';
import {
  changeScheduleAction,
  createScheduleAction,
  setScheduleTargetAction,
} from '../../../../reducers/schedule.reducer';
import { getRoutinesAction } from '../../../../reducers/routine.reducer';

// title, start, id가 포함되어야 함.
function Calendar() {
  const { schedules } = useSelector(state => state.schedule);
  const { members } = useSelector(state => state.member);
  const dispatch = useDispatch();

  // states
  const [clickedDate, setClickedDate] = useState(false);
  const [targetId, setTargetId] = useState('');
  const [scheduleList, setScheduleList] = useState([]);
  const [evt, setEvt] = useState();
  const [exeMember, setMember] = useState([]);
  const [name, setName] = useState([]);
  const [start, setStart] = useState([]);
  const [modalState, toggleModal] = useToggle(false);

  // // 내부 이벤트 초기화
  // useEffect(() => {
  //   setScheduleList(schedules);
  // }, [members, schedules]);

  // 외부 이벤트 초기화
  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      revert: true,
      zIndex: 999,
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("id");
        let memberId = eventEl.getAttribute("memberId");
        return {
          title: title,
          id: id,
          memberId: memberId,
          color: eventEl.style.background,
        };
      }
    });
    dispatch({type: GET_SCHEDULES_REQUEST});
  }, []);

  // 달력에 표시될 스케줄 초기화
  const handleTargetId = id => {
    // fullcalendar state에서 날짜형식은 ISO // 2017-03-16T17:40:00+09:00 이여야 함
    setTargetId(id);
  };

  /**
   * 날짜 : 2019-08-07
   * 작성자: 박종열
   * 기능 : 드래그 드롭시마다 사용자 이름, 폰넘버, 예전시간, 바뀐시간을 받아옴,
   *        날짜변환: 20190804 + 1630 => 2019-08-04 16:30
   */
  const drop = info => {
    //oldEvent
    const id = parseInt(info.event.id);
    const title = info.event.title;
    const afterDate = moment(info.event.start).format('YYYY-MM-DD'); // 변경 후 날짜
    const startTime = moment(info.event.start).format('HH:mm'); // 변경 후 시작 시간
    const endTime = moment(info.event.end).format('HH:mm'); // 변경 후 시작 시간
    console.log("endtime", endTime)
    const memberId = info.event.extendedProps.memberId; // 멤버 아이디
    dispatch(changeScheduleAction(id, afterDate, startTime, endTime, memberId));
    message.success(
      `[${title}] 회원님의 스케줄이 ${moment(afterDate + ' ' + startTime).format(
        'MM월DD일 HH시mm분'
      )}으로 변경되었습니다 `
    );
    //const beforDate = moment(info.oldEvent.start).format('YYYYMMDD'); // 변경 전 날짜
    // const endTime = moment(info.event.end).format('HHmm'); // 변경 후 종료 시간
    // const finishDNCD = info.event.extendedProps.finishDNCD ? 1 : 0; // 완료 여부 (1: true, 0: false)
  };

  /**
   * 날짜 : 2019-08-07
   * 작성자: 박종열
   * 기능 : 캘린더에서 스케줄 클릭시 얼러트창 생성
   *        삭제클릭시 phonenum, date, startTime 서버로 보냄
   */
  const handleEventClick = eventClick => {
    const id = eventClick.event.id;
    const memberName = eventClick.event.title;
    const memberId = eventClick.event.extendedProps.memberId;
    console.log("멤버아이디", memberId);
    const date = moment(eventClick.event.start).format('YYYY-MM-DD');

    setName(eventClick.event.title);
    setEvt(eventClick.event);
    handleTargetId(eventClick.event.id);
    setStart(moment(eventClick.event.start).format('MM월 DD일'));
    dispatch(setScheduleTargetAction(parseInt(id), parseInt(memberId), memberName));
    dispatch(getRoutinesAction(id));
  };

  // 클릭으로 이벤트 만들기
  const dateClick = info => {
    toggleModal();
    setClickedDate(info.dateStr);
  };

  const eventResize = info => {
    const id = parseInt(info.event.id);
    const title = info.event.title;
    const afterDate = moment(info.event.start).format('YYYY-MM-DD'); // 변경 후 날짜
    const afterStartTime = moment(info.event.start).format('HH:mm'); // 변경 후 시작 시간
    const afterEndTime = moment(info.event.end).format('HH:mm'); // 변경 후 시작 시간
    const memberId = info.event.extendedProps.memberId; // 멤버 아이디
    dispatch(changeScheduleAction(id, afterDate, afterStartTime, afterEndTime, memberId));
    // alert
    message.success(`[${title}] 회원 \n\n ${afterStartTime} ~ ${afterEndTime} 시간 변경!`);
  }

  const handleEventReceive = (info) => {
    const memberId = info.event.extendedProps.memberId; // 멤버 아이디
    const memberName = info.event.title; // 멤버 아이디
    const day = moment(info.event.start).format('YYYY-MM-DD'); // 날짜
    if (info.view.type === 'dayGridMonth') {
      const startTime = '20:00'; // 시작 시간
      const endTime = moment(info.event.start).add(1, 'hours').format('HH:mm'); // 끝 시간
      dispatch(createScheduleAction(memberId, memberName, startTime, endTime, 0, day));
    } else {
      const startTime = moment(info.event.start).format('HH:mm'); // 시작 시간
      const endTime = moment(info.event.start).add(1, 'hours').format('HH:mm'); // 끝 시간
      dispatch(createScheduleAction(memberId, memberName, startTime, endTime, 0, day));
    }
      info.event.remove();
  };

  // const eventRender = ({event, el}) => {
  //
  //   // const duration = moment.duration(moment(event.end).diff(event.start))
  //   // const hours = duration.asHours()
  //
  //   // el.style.border = `1px solid ${event.backgroundColor}`
  //   // el.className = `${el.className} event-class` // allows showing the edit and remove buttons only when hovering over the event
  //
  //   // if (!event.extendedProps.published && !event.allDay) {
  //   //     el.className = el.className + ' unpublished'  //it grays out the event if it hasn't been published
  //   // }
  //
  // // const child = document.createElement('span')
  // //   child.innerHTML = `
  // //           <button id="123" class="event-actions" data-event-id=${event.id}>
  // //           x
  // //           </button>
  // //     `
  // el.querySelector('.fc-title').innerHTML += "<span class='event-actions'>x</span>";
  //
  //   //  el.appendChild(child)
  //    const btns = el.getElementsByClassName('event-actions')
  //    const self = this
  //   btns[0].addEventListener('click', e => {
  //     removeSchedule(event.id);
  //     message.success(`${event.title}님 ${moment(event.start).format("HH시 mm분")} 삭제`);
  //  })
  // }
  return (
    // 이벤트 창
    <Row>
      <Col xl={3}>
        <div
          id="external-events"
          style={{
            padding: '10px',
            marginRight: '15px',
            maxHeight: '-webkit-fill-available',
            background: 'lightYellow',
            eventTextColor: 'white',
            border: '1px solid black'
          }}
        >
          <p align="center"><strong> 전체회원</strong></p>
          {members.map((member, idx) => (
            <div className="fc-event" title={member.memberName} memberId={member.id} key={member.id} style={{background: seedColors[1].colors[idx].color, color: 'white', textAlign: 'center'}}>
              {member.memberName}
            </div>
          ))}
        </div>
      </Col>
      <Col xl={21}>
        <div className="demo-app-calendar" id="mycalendartest">
          <FullCalendar
            selectable={true}
            nowIndicator={true}
            editable={true}
            minTime="09:00:00"
            defaultView="timeGridWeek"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth, timeGridWeek, listWeek',
            }}
            locale={koLocale}
            rerenderDelay={10}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            droppable
            eventReceive={handleEventReceive}
            events={schedules} // 달력안에 스케줄(events)이 표시된다.
            eventDrop={drop}
            eventClick={handleEventClick}
            dateClick={dateClick}
            eventDurationEditable={true}
            eventResize={eventResize}
            allDaySlot={true}
            // eventRender={eventRender}
            // ref={calendarComponentRef}
            // weekends={this.state.calendarWeekends}
            // drop={this.drop}
          />
        </div>
      </Col>
    </Row>
  );
}

export default Calendar;
