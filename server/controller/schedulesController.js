const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const db = require('../models_aws/index');
const schedulesController = {};
const calendarColors = require('../utils/seedColors');

const makeFirstWeekDates = (days, firstDate) => {
  let startDay = null;
  const firstDateFormated = moment(firstDate).format();

  switch (moment(firstDate).format('dddd')) {
    case 'Monday':
      firstDate = 1;
      break;
    case 'Tuesday':
      firstDate = 2;
      break;
    case 'Wednesday':
      firstDate = 3;
      break;
    case 'Thursday':
      firstDate = 4;
      break;
    case 'Friday':
      firstDate = 5;
      break;
    case 'Saturday':
      firstDate = 6;
      break;
    case 'Sunday':
      firstDate = 7;
      break;
    default:
      break;
  }

  const daysToDateArr = [];
  for (let i = 0; i < days.length; i++) {
    if (startDay === days[i]) {
      const tempFirstDate1 = moment(firstDateFormated);
      daysToDateArr.push(tempFirstDate1.format());
      console.log(
        '===================daysToDateArr==================',
        daysToDateArr
      );
    } else if (startDay > days[i]) {
      // ex) 수요일인데 그 다음주 월요일 구할때
      const tempFirstDate2 = moment(firstDateFormated);
      const nextWeekDayDiff = startDay - days[i];
      tempFirstDate2.add(7 - nextWeekDayDiff, 'days');
      daysToDateArr.push(tempFirstDate2.format());
    } else if (startDay < days[i]) {
      const tempFirstDate3 = moment(firstDateFormated);
      tempFirstDate3.add(days[i] - startDay, 'days');
      daysToDateArr.push(tempFirstDate3.format());
    }
  }
  return daysToDateArr.sort();
};

// [ 2013-07-12, , ,]
const makeAllSchedule = async (
  firstWeekDates,
  totalPT,
  foundMemberId,
  times
) => {
  console.log('===============firstWeekDates===============', firstWeekDates);
  const allSchedule = [];
  const copyFirstWeekDates = []; // 복사
  const copyFirstWeekDates2 = []; // 복사
  const weekNum = Math.floor(totalPT / firstWeekDates.length); // 10 / 3 = 3
  console.log('weekNum', weekNum);
  const remainDayNum = totalPT % firstWeekDates.length;

  // 첫 주 요일들의 날짜를 넣는다.
  for (let i = 0; i < firstWeekDates.length; i++) {
    copyFirstWeekDates.push(moment(firstWeekDates[i])); // 복사를 위해 수행
    copyFirstWeekDates2.push(moment(firstWeekDates[i])); // 복사를 위해 수행
    allSchedule.push(moment(firstWeekDates[i]).format()); // 첫 요일들을 담음
  }

  // 중간 주의 요일들을 넣는다.
  for (var i = 0; i < firstWeekDates.length; i++) {
    for (let j = 1; j < weekNum; j++) {
      allSchedule.push(copyFirstWeekDates2[i].add(1, 'weeks').format());
    }
  }

  console.log('===========allSchedule=========', allSchedule);

  if (!remainDayNum === 0) {
    // 남은 요일들을 넣는다.
    for (let r = 0; r < remainDayNum; r++) {
      allSchedule.push(copyFirstWeekDates[r].add(weekNum, 'weeks').format());
    }
    allSchedule.sort();
  }

  let j = 0;
  const createdAllSchedules = allSchedule.map((cv, i) => {
    if (j === times.length) {
      // EX) 배열로 들어온 월, 수, 금 차례로 넣어주기 위한 장치)
      j = 0;
    }
    const date =
      moment(cv).format('YYYYMMDD') +
      ' ' +
      moment(times[j++]).format('HHmm');
    const finalDate = moment(date).format('YYYY-MM-DD HH:mm');

    return {
      StartTime: finalDate,
      MemberId: foundMemberId,
      EndTime: '0000',
      IsFinish: false,
      IsTemp: '??',
      Day: moment(cv).format('E'),
    };
  });

  return createdAllSchedules;
};

// createdAllSchedules = [date, date, date ...]
const createAllSchedules = async createdAllSchedules => {
  console.log('createdAllSchedules', createdAllSchedules);
  let createdDbSchedules;
  try {
    createdDbSchedules = await db.Schedule.bulkCreate(createdAllSchedules);
  } catch (err) {
    console.log(err);
  }
  return createdDbSchedules;
};

schedulesController.setSchedule = async (req, res) => {
  const { firstDate, times, totalPT, days, phoneNum } = req.body; // 시작일, 횟수, 요일배열
  console.log(
    'days: ',
    days,
    'date: ',
    moment(firstDate).day(),
    'time: ',
    times,
    'totalPT',
    totalPT
  );

  if (!days.includes(moment(firstDate).day())) {
    console.log('시작일이 선택요일에 포함되지 않음');
    return res
      .status(400)
      .json({ msg: '시작일이 선택요일에 포함되지 않습니다.' });
  }

  try {
    const firstWeekDates = await makeFirstWeekDates(days, firstDate);
    const foundMemberId = await db.Member.findOne({
      where: { PhoneNum: phoneNum },
      attributes: ['MemberId'],
    });
    console.log('foundMemberId', foundMemberId.dataValues.MemberId);
    const allSchedules = await makeAllSchedule(
      firstWeekDates,
      totalPT,
      foundMemberId.dataValues.MemberId,
      times
    );
    const createdDbSchedules = await createAllSchedules(allSchedules, phoneNum);
    console.log('createdDbSchedules', createdDbSchedules);
    res.json(createdDbSchedules);
  } catch (err) {
    console.log(err);
  }
};

schedulesController.getSchedule = async (req, res) => {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  try {
    const foundMembersWithSchedules = await db.Member.findAll({
      where: {
        TrainerId: req.trainer,
      },
      include: {
        model: db.Schedule,
      },
    });
    const memberSchedules = [];
    console.log('foundMembersWithSchedules', foundMembersWithSchedules);
    for (let i = 0; i < foundMembersWithSchedules.length; i++) {
      memberSchedules.push(
        foundMembersWithSchedules[i].Schedules.map(schedule => {
          return {
            title: foundMembersWithSchedules[i].Name,
            start: schedule.StartTime,
            id: schedule.ScheduleId,
            color: calendarColors[3].colors[i].color,
            isFinish: schedule.IsFinish,
            memberId: foundMembersWithSchedules[i].MemberId,
          };
        })
      );
    }
    console.log('!!!!!!!!!!!!memberSchedules!!!!!!!!!!!!!!!', memberSchedules);
    res.json(memberSchedules);
  } catch (err) {
    console.log(err);
  }
};

schedulesController.removeSchedule = async (req, res) => {
  const { scheduleId, memberId } = req.body;
  try {
    const result = await db.Schedule.destroy({
      where: { ScheduleId: scheduleId },
    });
    if (!result) {
      return res.status(400).send('삭제 대상이 없습니다.');
    } else {
      return res.json(result);
    }
  } catch (err) {
    return res.status(500).send('server err');
  }
};
module.exports = schedulesController;
