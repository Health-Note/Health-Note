const moment = require("moment");
const db = require("../models/index");
const schedulesController = {};
const calendarColors = require("../utils/seedColors");

const getStartDate = (days, start_date) => {
  let startDay = null;
  const startDate = moment(start_date).format();
  console.log(startDate);
  console.log(moment(start_date).format("dddd"));
  console.log(moment(start_date).format("E"));
  console.log("=======days.length======", days.length);

  switch (moment(start_date).format("dddd")) {
    case "Monday":
      startDay = 1;
      break;
    case "Tuesday":
      startDay = 2;
      break;
    case "Wednesday":
      startDay = 3;
      break;
    case "Thursday":
      startDay = 4;
      break;
    case "Friday":
      startDay = 5;
      break;
    case "Saturday":
      startDay = 6;
      break;
    case "Sunday":
      startDay = 7;
      break;
    default:
      break;
  }

  const daysToDateArr = [];
  for (let i = 0; i < days.length; i++) {
    if (startDay === days[i]) {
      console.log(
        "===================daysToDateArr==================",
        daysToDateArr
      );
      const tempStartDate1 = moment(startDate);
      daysToDateArr.push(tempStartDate1.format());
    } else if (startDay > days[i]) {
      // ex) 수요일인데 그 다음주 월요일 구할때
      const tempStartDate2 = moment(startDate);
      const nextWeekDayDiff = startDay - days[i];
      tempStartDate2.add(7 - nextWeekDayDiff, "days");
      daysToDateArr.push(tempStartDate2.format());
    } else if (startDay < days[i]) {
      const tempStartDate3 = moment(startDate);
      tempStartDate3.add(days[i] - startDay, "days");
      daysToDateArr.push(tempStartDate3.format());
    }
  }
  return daysToDateArr.sort();
};

// [ 2013-07-12, , ,]
const makeAllSchedule = (startDatesByDays, unusedpt, phonenum, start_time) => {
  console.log(
    "===============startDatesByDays===============",
    startDatesByDays
  );
  const allSchedule = [];
  const copyStartDatesByDays = []; // 복사
  const copyStartDatesByDays2 = []; // 복사
  const weekNum = Math.floor(unusedpt / startDatesByDays.length); // 10 / 3 = 3
  console.log("weekNum", weekNum);
  const remainDayNum = unusedpt % startDatesByDays.length;

  // 첫 주 요일들의 날짜를 넣는다.
  for (let i = 0; i < startDatesByDays.length; i++) {
    copyStartDatesByDays.push(moment(startDatesByDays[i])); // 복사를 위해 수행
    copyStartDatesByDays2.push(moment(startDatesByDays[i])); // 복사를 위해 수행
    allSchedule.push(moment(startDatesByDays[i]).format()); // 첫 요일들을 담음
  }

  // 중간 주의 요일들을 넣는다.
  for (var i = 0; i < startDatesByDays.length; i++) {
    for (let j = 1; j < weekNum; j++) {
      allSchedule.push(copyStartDatesByDays2[i].add(1, "weeks").format());
    }
  }

  console.log("===========allSchedule=========", allSchedule);

  if (!remainDayNum === 0) {
    // 남은 요일들을 넣는다.
    for (let r = 0; r < remainDayNum; r++) {
      allSchedule.push(copyStartDatesByDays[r].add(weekNum, "weeks").format());
    }
    allSchedule.sort();
  }

  let j = 0;
  const createdAllSchedules = allSchedule.map((cv, i) => {
    if (j === start_time.length) {
      j = 0;
    }
    return {
      date: moment(cv).format("YYYYMMDD"),
      phonenum: phonenum,
      start_time: moment(start_time[j++]).format("HHmm"),
      // !! [시작시간, 시작시간, 시작시간]형태로 온 시작시간 데이터를 어떻게 전체 날짜를 기준으로 넣어서 객체로 만들 것인가?
      end_time: "0000",
      color: "blue",
      finish_dncd: false
    };
  });

  return createdAllSchedules;
};

// createdAllSchedules = [date, date, date ...]
const createAllSchedules = async (createdAllSchedules, phonenum) => {
  console.log("createdAllSchedules", createdAllSchedules);
  let createdDbSchedules;
  try {
    createdDbSchedules = await db.Schedule.bulkCreate(createdAllSchedules);
  } catch (err) {
    console.log(err);
  }
  return createdDbSchedules;
};

schedulesController.setSchedule = async (req, res) => {
  const { start_date, start_time, unusedpt, days, phonenum } = req.body; // 시작일, 횟수, 요일배열
  console.log("days", days);

  try {
    const startDatesByDays = await getStartDate(days, start_date);
    const allSchedules = await makeAllSchedule(
      startDatesByDays,
      unusedpt,
      phonenum,
      start_time
    );
    const createdDbSchedules = await createAllSchedules(allSchedules, phonenum);
    console.log("createdDbSchedules", createdDbSchedules);
    res.json(createdDbSchedules);
  } catch (err) {
    console.log(err);
  }
};

schedulesController.getSchedule = async (req, res) => {
  try {
    const foundMembersWithSchedules = await db.Member.findAll({
      where: {
        trainer_id: req.trainer
      },
      include: {
        model: db.Schedule
      }
    });
    const arr = [];
    for (let i = 0; i < foundMembersWithSchedules.length; i++) {
      arr.push(
        foundMembersWithSchedules[i].schedules.map(cv => {
          const d = moment(cv.date).format("YYYYMMDD") + " " + cv.start_time;
          return {
            title: foundMembersWithSchedules[i].name,
            start: moment(d).format(),
            id: cv.phonenum,
            color: calendarColors[i].color,
            finish_dncd: cv.finish_dncd
          };
        })
      );
    }
    res.json(arr);
  } catch (err) {
    console.log(err);
  }
};

module.exports = schedulesController;
