import React, { useState, useEffect, useContext, useRef } from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import '@fullcalendar/core/main.css';
import '@fullcalendar/timegrid/main.css';
import { message } from 'antd';
import './Calendar.css';
import { ScheduleContext } from '../../../../contexts/schedule.context';
import { MembersContext } from '../../../../contexts/members.context';
import { RoutineContext } from '../../../../contexts/routine.context';
import Alert from '../../../context/molecules/Alert';
import AntdModal from '../../../context/organisms/CalendarModal';
import useToggle from '../../../../hooks/useToggle';

// title, start, id가 포함되어야 함.
function Calendar() {
  // useContext
  const {
    schedules,
    getAllSchedules,
    setDrawer,
    changeSchedule,
    setScheduleTarget,
    createOneSchedule,
  } = useContext(ScheduleContext);
  const { setSelectedDate } = useContext(RoutineContext);
  const { members } = useContext(MembersContext);

  // states
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [clickedDate, setClickedDate] = useState(false);
  const [targetId, setTargetId] = useState('');
  const [scheduleList, setScheduleList] = useState([]);
  const [evt, setEvt] = useState();
  const [exeMember, setMember] = useState([]);
  const [name, setName] = useState([]);
  const [start, setStart] = useState([]);
  const [modalState, toggleModal] = useToggle(false);

  // 내부 이벤트 초기화
  useEffect(() => {
    setScheduleList(schedules);
  }, [members, schedules]);

  // 외부 이벤트 초기화
  useEffect(() => {
    getAllSchedules();
    setMember(exeMember);
  }, []);

  // 달력에 표시될 스케줄 초기화

  const handleTargetId = id => {
    // fullcalendar state에서 날짜형식은 ISO // 2017-03-16T17:40:00+09:00 이여야 함
    setTargetId(id);
  };

  const handleRemove = () => {
    // alert.js에서 실행됨
    const phonenum = evt.id.substr(0, 11);
    const date = moment(evt.start).format('YYYYMMDD');
    const startTime = moment(evt.start).format('HHmm');
    evt.remove();
  };

  /**
   * 날짜 : 2019-08-07
   * 작성자: 박종열
   * 기능 : 드래그 드롭시마다 사용자 이름, 폰넘버, 예전시간, 바뀐시간을 받아옴,
   *        날짜변환: 20190804 + 1630 => 2019-08-04 16:30
   */
  const drop = info => {
    //oldEvent
    const id = info.event.id;
    const title = info.event.title;
    const afterDate = moment(info.event.start).format('YYYY-MM-DD'); // 변경 후 날짜
    const startTime = moment(info.event.start).format('HH:mm'); // 변경 후 시작 시간
    changeSchedule(id, afterDate, startTime);
    message.success(
      `${title}님의 스케줄이 ${moment(afterDate + ' ' + startTime).format(
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
    const scheduleId = eventClick.event.id;
    const title = eventClick.event.title;
    const start = eventClick.event.start;
    const memberId = eventClick.event.extendedProps.memberId;
    const date = moment(eventClick.event.start).format('YYYY-MM-DD');

    setName(eventClick.event.title);
    setEvt(eventClick.event);
    handleTargetId(eventClick.event.id);
    //setToggle(!toggle); // alert창을 오픈
    setStart(moment(eventClick.event.start).format('MM월 DD일'));
    setSelectedDate(date, memberId);
    setDrawer(true);
    setScheduleTarget(parseInt(scheduleId), parseInt(memberId));
    // removeSchedule(scheduleId, memberId);
  };

  // 클릭으로 이벤트 만들기
  const dateClick = info => {
    toggleModal();
    setClickedDate(info.dateStr);
  };

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
              padding: '10px',
              height: '500px',
              maxHeight: '-webkit-fill-available',
            }}
          >
            {/* <p align="center"><strong> 전체회원</strong></p>
               {exeMember.map(member => (
                <div className="fc-event" title={member.title} key={member.id} >
                  {member.title}
                </div>
              ))} */}
          </div>
        </Grid>
        <Grid item xs={11}>
          <AntdModal
            title={'스케줄 추가'}
            modalState={modalState}
            toggleModal={toggleModal}
            clickedDate={clickedDate}
            members={members}
            createOneSchedule={createOneSchedule}
          />
          <div className="demo-app-calendar" id="mycalendartest">
            <FullCalendar
              height={700}
              mirrorSelector=".gu-mirror"
              selectable
              minTime="09:00:00"
              defaultView="timeGridWeek"
              header={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth, timeGridWeek, listWeek',
              }}
              locale={koLocale}
              rerenderDelay={10}
              eventDurationEditable={false}
              editable
              droppable
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              // ref={calendarComponentRef}
              // weekends={this.state.calendarWeekends}
              events={scheduleList} // 달력안에 스케줄(events)이 표시된다.
              eventDrop={drop}
              // drop={this.drop}
              eventClick={handleEventClick}
              dateClick={dateClick}
              // eventColor={evtColor}
              // eventReceive={handleEventReceive}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Calendar;
