const { db, sequelize } = require('../models');
const calendarColors = require('../utils/seedColors');
const CustomError = require('../common/error');

const initialize = async (body, accountId) => {
  const { startTime, totalPT, days } = body; // 시작일, 시작시간(아래 test data)
  let returnMemberId = undefined;
  // test data - days
  // const days = [
  //   { day:1, hour: 8, min: 30 },
  //   { day:3, hour: 5, min:0 },
  //   { day:5, hour: 1, min: 30 }
  // ]
  // --
  const date = new Date(startTime);
  let result = false;
  for (const check of days) {
    if (check.day === date.getDay()) {
      result = true;
    }
  }
  if (result === false)
    throw new CustomError(
      'badRequest',
      400,
      '시작일이 선택요일에 포함되지 않음'
    ); // 400

  let pt = 0;
  const dateArr = [];
  while (pt < totalPT) {
    const addDay = date.getDay(); // 계속 원하는 요일을 구한다 range: [0~6]
    for (let data of days) {
      if (addDay === data.day) {
        // 원하는 요일이 나타나면 pt권 하나를 셋팅할 날짜를 지정한다(시간까지 포함한다)
        //console.log(data.day);
        pt++;
        const startDate = new Date(date.valueOf()); // 참조 객체이기 때문에 clone해서 추가해야 한다
        startDate.setHours(startDate.getHours() + data.hour); // 시간
        startDate.setMinutes(startDate.getMinutes() + data.min); // 분
        dateArr.push(startDate);
      }
    }
    date.setDate(date.getDate() + 1); // 날짜 + 1 시키면서 계속 원하는 요일을 구한다 range: [0~6]
  }
  //console.log(dateArr);

  // 멤버 추가 후 스케줄을 추가해야 함
  const { memberName, phoneNum, gender, age } = body;
  const transactionResult = await sequelize.transaction(async (t) => {
    // 멤버 추가
    const member = await db.member.create(
      {
        phoneNum: phoneNum,
        memberName: memberName,
        gender: gender,
        age: age,
        totalPT: totalPT,
        usedPT: 0,
        registration: 1,
        accountId: accountId,
      },
      { transaction: t }
    );

    const initailSchedules = []; // DB에 bulk insert 할 데이터를 셋팅한다 위에가 알고리즘이고 여긴 데이터 셋팅
    for (let PTDay of dateArr) {
      const endTime = new Date(PTDay.valueOf());

      // sequelize 로 timezone설정을 해도 + 8시간으로 DB에 insert 되기 때문에 코드에서 다시 보정한다..
      endTime.setHours(endTime.getHours() + 1 - 9);
      PTDay.setHours(PTDay.getHours() - 9);

      const schedule = {
        memberId: member.id,
        day: PTDay,
        startTime: PTDay,
        endTime: endTime,
        isFinish: 0,
        tooltipText: '',
      };
      initailSchedules.push(schedule);
    }
    //console.log(initailSchedules);

    //  DB 입력
    await db.schedule.bulkCreate(initailSchedules, { transaction: t });
    // 끝
    //console.log(member.id);
    returnMemberId = member.id;
  });
  return { memberId: returnMemberId };
};

// 스케줄 가져오기
const get = async (id) => {
  const allSchedulesOfMember = await db.member.findAll({
    where: {
      accountId: id,
    },
    attributes: ['id', 'memberName'],
    include: {
      model: db.schedule,
      required: true, // false는 left outer join, true 는 inner join
      attributes: [
        'id',
        'startTime',
        'endTime',
        'isFinish',
        'day',
        'tooltipText',
      ],
    },
    raw: true,
    nest: true,
  });

  return allSchedulesOfMember;
};

// 스케줄 삭제
const remove = async (query) => {
  const { id, memberId } = query;
  const count = await db.schedule.destroy({
    where: { id: id, memberId: memberId },
  });
};

// 스케줄 변경
const update = async (body, id) => {
  const { memberId, startTime, endTime, isFinish, day, tooltipText } = body;

  await db.schedule.update(
    {
      startTime: startTime, //moment(afterDate + ' ' + afterTime).format('YYYY-MM-DD HH:mm'),
      endTime: endTime,
      isFinish: isFinish,
      day: day, //moment(afterDate).isoWeekday(),
      tooltipText: tooltipText,
    },
    {
      where: { id: id, memberId: memberId },
    }
  );
};

const create = async (body) => {
  const { memberId, startTime, endTime, isFinish, day, tooltipText } = body;

  //startTime = moment(date).format('YYYY-MM-DD HH:mm');
  //console.log('date, memberId!!!!!!!!!!!!!!!!!', date, memberId);
  //day = moment(date).isoWeekday();

  const result = await db.schedule.create({
    memberId: memberId,
    startTime: startTime, //moment(afterDate + ' ' + afterTime).format('YYYY-MM-DD HH:mm'),
    endTime: endTime,
    isFinish: isFinish,
    day: day, //moment(afterDate).isoWeekday(),
    tooltipText: tooltipText,
  });

  return { id: result.id };
};

module.exports = { get, update, remove, create, initialize };
