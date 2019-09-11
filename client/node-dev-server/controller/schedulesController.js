const moment = require ('moment');
const db = require("../models/index");
const schedulesController = {};

const getStartDate = (days, start_date) => {
    let startDay = null;
    const startDate = moment(start_date).format();
    
    switch (moment(start_date).format("dddd")) {
        case "Monday":    startDay = 1; break;
        case "Thuseday":  startDay = 2; break; 
        case "Wednesday": startDay = 3; break; 
        case "Thursday":  startDay = 4; break;
        case "Friday":    startDay = 5; break;
        case "Saturday":  startDay = 6; break;
        case "Sunday":    startDay = 0; break;
        default: return null;
    }  
        const daysToDateArr = [];
        for (let i = 0; i < days.length; i++) {
            if (startDay === days[i]) {
                const tempStartDate1 = moment(startDate); 
                 daysToDateArr.push(tempStartDate1.format()); 
            } else if (startDay > days[i]) { // ex) 수요일인데 그 다음주 월요일 구할때
                const tempStartDate2 = moment(startDate); 
                const nextWeekDayDiff = startDay - days[i];
                tempStartDate2.add(7 - nextWeekDayDiff, 'days');
                daysToDateArr.push(tempStartDate2.format());  
            } 
            else if (startDay < days[i]) {
                const tempStartDate3 = moment(startDate);
                tempStartDate3.add((days[i] - startDay), 'days');
                daysToDateArr.push(tempStartDate3.format()); 
            }
        }   
        return daysToDateArr.sort();
    }

    const makeAllSchedule = (startDatesByDays, unusedpt) => {
        
        const allSchedule = [];
        const copyStartDatesByDays = []; // 복사
        const copyStartDatesByDays2 = []; // 복사
        const weekNum = Math.floor(unusedpt / startDatesByDays.length); // 10 / 3 = 3
        console.log(weekNum)
        const remainDayNum = unusedpt % startDatesByDays.length;
        
        // 첫 주 요일들의 날짜를 넣는다.
        for (let i = 0 ; i < startDatesByDays.length; i++) {
            copyStartDatesByDays.push(moment(startDatesByDays[i])); // 복사를 위해 수행
            copyStartDatesByDays2.push(moment(startDatesByDays[i])); // 복사를 위해 수행
            allSchedule.push(moment(startDatesByDays[i]).format()); // 첫 요일들을 담음
        }
    
        // 중간 주의 요일들을 넣는다.
        for (var i = 0; i < startDatesByDays.length; i++) { 
            for (let j = 1 ; j < weekNum; j ++) {
                allSchedule.push(copyStartDatesByDays2[i].add(1, "weeks").format())
            }
        }
    
        if (remainDayNum === 0 )  return allSchedule;
        
        // 남은 요일들을 넣는다.
        for (let r = 0; r < remainDayNum; r++) {
            allSchedule.push(copyStartDatesByDays[r].add(weekNum, "weeks").format());
        }
    
        return allSchedule.sort();
    } 

    const createAllSchedules = async (allSchedule, phonenum) => {
        let createdSchedules;
        for (let i; i < allSchedule.length; i++) {
            try {
                createdSchedules = await db.Schedule.create({
                    date: allSchedule[i],
                    phonenum: phonenum,
                    start_time: moment(allSchedule[i].format("hhmm")),
                    end_time: "0000",
                    finish_dncd: false,
                });
            } catch (err) {
                console.log(err);
            }
        } 
        return createdSchedules;
    }

    schedulesController.setSchedule = async (req, res) => {
        const { start_date, unusedpt, days, phonenum } = req.body; // 시작일, 횟수, 요일배열
        console.log("start_date:", start_date, "days:", days, "unusedpt:", unusedpt, "phonenum:", phonenum);
        
        const startDatesByDays = await getStartDate(days, start_date);
        const allSchedules = await makeAllSchedule(startDatesByDays, unusedpt);
        const createdSchedules = await createAllSchedules(allSchedules, phonenum);
        res.json(createdSchedules);
    }

module.exports = schedulesController;