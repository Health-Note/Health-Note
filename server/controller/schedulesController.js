const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
const db = require('../models2/index');
const schedulesController = {};
const calendarColors = require('../utils/seedColors');

const getStartDate = (days, startDate) => {
  let startDay = null;
  const startDateFormat = moment(startDate).format();
  console.log(startDate);
  console.log('=======days.length======', days.length);

  switch (moment(startDate).format('dddd')) {
    case 'Monday':
      startDay = 1;
      break;
    case 'Tuesday':
      startDay = 2;
      break;
    case 'Wednesday':
      startDay = 3;
      break;
    case 'Thursday':
      startDay = 4;
      break;
    case 'Friday':
      startDay = 5;
      break;
    case 'Saturday':
      startDay = 6;
      break;
    case 'Sunday':
      startDay = 7;
      break;
    default:
      break;
  }

  const daysToDateArr = [];
  for (let i = 0; i < days.length; i++) {
    if (startDay === days[i]) {
      const tempStartDate1 = moment(startDateFormat);
      daysToDateArr.push(tempStartDate1.format());
      console.log(
        '===================daysToDateArr==================',
        daysToDateArr
      );
    } else if (startDay > days[i]) {
      // ex) 수요일인데 그 다음주 월요일 구할때
      const tempStartDate2 = moment(startDateFormat);
      const nextWeekDayDiff = startDay - days[i];
      tempStartDate2.add(7 - nextWeekDayDiff, 'days');
      daysToDateArr.push(tempStartDate2.format());
    } else if (startDay < days[i]) {
      const tempStartDate3 = moment(startDateFormat);
      tempStartDate3.add(days[i] - startDay, 'days');
      daysToDateArr.push(tempStartDate3.format());
    }
  }
  return daysToDateArr.sort();
};

// [ 2013-07-12, , ,]
const makeAllSchedule = async (
  startDatesByDays,
  totalPT,
  foundMemberId,
  startTime
) => {
  console.log(
    '===============startDatesByDays===============',
    startDatesByDays
  );
  const allSchedule = [];
  const copyStartDatesByDays = []; // 복사
  const copyStartDatesByDays2 = []; // 복사
  const weekNum = Math.floor(totalPT / startDatesByDays.length); // 10 / 3 = 3
  console.log('weekNum', weekNum);
  const remainDayNum = totalPT % startDatesByDays.length;

  // 첫 주 요일들의 날짜를 넣는다.
  for (let i = 0; i < startDatesByDays.length; i++) {
    copyStartDatesByDays.push(moment(startDatesByDays[i])); // 복사를 위해 수행
    copyStartDatesByDays2.push(moment(startDatesByDays[i])); // 복사를 위해 수행
    allSchedule.push(moment(startDatesByDays[i]).format()); // 첫 요일들을 담음
  }

  // 중간 주의 요일들을 넣는다.
  for (var i = 0; i < startDatesByDays.length; i++) {
    for (let j = 1; j < weekNum; j++) {
      allSchedule.push(copyStartDatesByDays2[i].add(1, 'weeks').format());
    }
  }

  console.log('===========allSchedule=========', allSchedule);

  if (!remainDayNum === 0) {
    // 남은 요일들을 넣는다.
    for (let r = 0; r < remainDayNum; r++) {
      allSchedule.push(copyStartDatesByDays[r].add(weekNum, 'weeks').format());
    }
    allSchedule.sort();
  }

  let j = 0;
  const createdAllSchedules = allSchedule.map((cv, i) => {
    if (j === startTime.length) {
      // EX) 배열로 들어온 월, 수, 금 차례로 넣어주기 위한 장치)
      j = 0;
    }
    const date =
      moment(cv).format('YYYYMMDD') +
      ' ' +
      moment(startTime[j++]).format('HHmm');
    const finalDate = moment(date).format('YYYY-MM-DD HH:mm');


    return {
      StartDate: finalDate,
      MemberId: foundMemberId,
      EndDate: '0000',
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
  const { startDate, startTime, totalPT, days, phoneNum } = req.body; // 시작일, 횟수, 요일배열
  console.log(
    'days: ',
    days,
    'startdate: ',
    moment(startDate).day(),
    'startTime: ',
    startTime,
    'totalPT',
    totalPT
  );

  if (!days.includes(moment(startDate).day())) {
    console.log('시작일이 선택요일에 포함되지 않음');
    return res
      .status(400)
      .json({ msg: '시작일이 선택요일에 포함되지 않습니다.' });
  }

  try {
    const startDatesByDays = await getStartDate(days, startDate);
    const foundMemberId = await db.Member.findOne({
      where: { PhoneNum: phoneNum },
      attributes: ['MemberId'],
    });
    console.log("foundMemberId", foundMemberId.dataValues.MemberId)
    const allSchedules = await makeAllSchedule(
      startDatesByDays,
      totalPT,
      foundMemberId.dataValues.MemberId,
      startTime
    );
    const createdDbSchedules = await createAllSchedules(allSchedules, phoneNum);
    console.log('createdDbSchedules', createdDbSchedules);
    res.json(createdDbSchedules);
  } catch (err) {
    console.log(err);
  }
};

schedulesController.getSchedule = async (req, res) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  try {
    const foundMembersWithSchedules = await db.Member.findAll({
      where: {
        TrainerId: req.trainer,
      },
      include: {
        model: db.Schedule,
      },
    });
    const arr = [];
    console.log("foundMembersWithSchedules", foundMembersWithSchedules)
    for (let i = 0; i < foundMembersWithSchedules.length; i++) {
      arr.push(
        foundMembersWithSchedules[i].schedules.map(schedule => {
          return {
            title: foundMembersWithSchedules[i].Name,
            start: schedule.StartDate,
            id: schedule.ScheduleId,
            color: calendarColors[3].colors[i].color,
            isFinish: schedule.IsFinish,
          };
        })
      );
    }
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!", arr)
    res.json(arr);
  } catch (err) {
    console.log(err);
  }
};

module.exports = schedulesController;
