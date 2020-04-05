const moment = require('moment');
const db = require('../loaders/sequelize');
const schedulesController = {};
const calendarColors = require('../utils/seedColors');

const makeFirstWeekDates = (days, firstDate, times) => {
  let startDay = null;
  const firstDateFormated = moment(firstDate).format('YYYY-MM-DD');
  console.log('firstDateFormated', firstDateFormated);

  switch (moment(firstDate).isoWeekday()) {
    case 1:
      startDay = 1;
      break;
    case 2:
      startDay = 2;
      break;
    case 3:
      startDay = 3;
      break;
    case 4:
      startDay = 4;
      break;
    case 5:
      startDay = 5;
      break;
    case 6:
      startDay = 6;
      break;
    case 7:
      startDay = 7;
      break;
    default:
      break;
  }

  const firstWeekDates = [];
  for (let i = 0; i < days.length; i++) {
    // ex) 선택요일이 수요일인데 수요일 날짜 구할때
    if (startDay === days[i]) {
      const tempString1 =
        firstDateFormated + ' ' + moment(times[i]).format('HH:mm');
      const tempFirstDate1 = moment(tempString1);
      console.log('tempFirstDate1', tempFirstDate1);
      firstWeekDates.push(tempFirstDate1);
    } else if (startDay > days[i]) {
      // ex) 선택요일이 수요일인데 그 다음주 월요일 구할때
      const tempString2 =
        firstDateFormated + ' ' + moment(times[i]).format('HH:mm');
      tempFirstDate2 = moment(tempString2);
      const nextWeekDayDiff = startDay - days[i];
      tempFirstDate2.add(7 - nextWeekDayDiff, 'days');
      firstWeekDates.push(tempFirstDate2);
    } else if (startDay < days[i]) {
      // ex) 선택요일이 수요일인데 이번주 금요일 구할때
      const tempString3 =
        firstDateFormated + ' ' + moment(times[i]).format('HH:mm');
      const tempFirstDate3 = moment(tempString3);
      tempFirstDate3.add(days[i] - startDay, 'days');
      firstWeekDates.push(tempFirstDate3);
    }
  }
  let sortedArray = firstWeekDates.sort((a, b) => a.valueOf() - b.valueOf());
  console.log('==========firstWeekDates=====', sortedArray);
  return sortedArray;
};

// 전체 스케줄 날짜 구하기
const makeAllSchedule = async (
  firstWeekDates,
  totalPT,
  foundMemberId,
  times
) => {
  const allSchedule = [];
  const copyFirstWeekDates = []; // 복사
  const copyFirstWeekDates2 = []; // 복사
  const weekNum = Math.floor(totalPT / firstWeekDates.length); // 10 / 3 = 3
  console.log('weekNum', weekNum);
  const remainDayNum = totalPT % firstWeekDates.length;
  console.log('remainDayNun', remainDayNum);

  // 첫 주 요일들의 날짜를 넣는다.
  for (let i = 0; i < firstWeekDates.length; i++) {
    copyFirstWeekDates.push(moment(firstWeekDates[i])); // 복사를 위해 수행
    copyFirstWeekDates2.push(moment(firstWeekDates[i])); // 복사를 위해 수행
    allSchedule.push(moment(firstWeekDates[i]).format()); // 첫 요일들을 담음
  }

  // 중간 주의 요일들을 넣는다.
  for (var i = 0; i < firstWeekDates.length; i++) {
    for (let j = 0; j < weekNum - 1; j++) {
      allSchedule.push(copyFirstWeekDates2[i].add(1, 'weeks').format());
    }
  }

  if (remainDayNum !== 0) {
    // 남은 요일들을 넣는다.
    for (let r = 0; r < remainDayNum; r++) {
      allSchedule.push(copyFirstWeekDates[r].add(weekNum, 'weeks').format());
    }
    allSchedule.sort();
  }

  console.log('===========allSchedule=========', allSchedule);

  let j = 0;
  const createdAllSchedules = allSchedule.map((cv, i) => {
    // if (j === times.length) {
    //   // EX) 배열로 들어온 월, 수, 금 차례로 넣어주기 위한 장치)
    //   j = 0;
    // }
    // const date =
    //   moment(cv).format('YYYYMMDD') +
    //   ' ' +
    //   moment(times[j++]).format('HHmm');
    // const finalDate = moment(date).format('YYYY-MM-DD HH:mm');

    return {
      StartTime: cv,
      MemberId: foundMemberId,
      EndTime: '0000',
      IsFinish: false,
      IsTemp: '??',
      Day: moment(cv).isoWeekday(),
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
    moment(firstDate).isoWeekday(),
    'times: ',
    times,
    moment(times[0]).format('HHmm'),
    'totalPT: ',
    totalPT
  );

  if (!days.includes(moment(firstDate).isoWeekday())) {
    console.log('시작일이 선택요일에 포함되지 않음');
    return res
      .status(400)
      .json({ msg: '시작일이 선택요일에 포함되지 않습니다.' });
  }

  try {
    const firstWeekDates = await makeFirstWeekDates(days, firstDate, times);
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

// 스케줄 가져오기
schedulesController.getSchedule = async (req, res) => {
  try {
    const foundMembersWithSchedules = await db.Member.findAll({
      where: {
        TrainerId: req.user,
      },
      include: {
        model: db.Schedule,
      },
    });
    const memberSchedules = [];
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
    res.json(memberSchedules);
  } catch (err) {
    console.log(err);
  }
};

// 스케줄 삭제
schedulesController.removeSchedule = async (req, res) => {
  const { scheduleId } = req.body;
  try {
    const result = await db.Schedule.destroy({
      where: { ScheduleId: scheduleId },
    });
    if (!result) {
      return res.status(400).send('삭제 대상이 없습니다.');
    } else if (result) {
      return res.json(result);
    }
  } catch (err) {
    return res.status(500).send('server err');
  }
};

// 스케줄 변경
schedulesController.changeSchedule = async (req, res) => {
  const { id, afterDate, afterTime } = req.body;
  try {
    const result = await db.Schedule.update(
      {
        StartTime: moment(afterDate + ' ' + afterTime).format(
          'YYYY-MM-DD HH:mm'
        ),
        Day: moment(afterDate).isoWeekday(),
      },
      {
        where: { ScheduleId: id },
      }
    );

    if (result) {
      const foundSchedule = await db.Schedule.findOne({
        where: {
          ScheduleId: id,
        },
      });
      console.log("fountSchedule", foundSchedule)
      res.json(foundSchedule);
    }

  } catch (err) {
    console.log(err);
  }
};

schedulesController.createOneSchedule = async (req, res) => {
  const { date, memberId } = req.body;
  startTime = moment(date).format('YYYY-MM-DD HH:mm');
  console.log('date, memberId!!!!!!!!!!!!!!!!!', date, memberId);
  day = moment(date).isoWeekday();
  try {
    const result = await db.Schedule.create({
      StartTime: startTime,
      MemberId: memberId,
      EndTime: '0000',
      IsFinish: false,
      Day: day,
    });
    console.log('createdResult', result);
    return res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('server err');
  }
};
module.exports = schedulesController;
