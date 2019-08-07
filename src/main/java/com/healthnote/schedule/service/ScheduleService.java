package com.healthnote.schedule.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

import javax.swing.text.html.HTMLDocument.Iterator;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthnote.members.dao.ScheduleDAO;
import com.healthnote.vo.RoutineDTO;
import com.healthnote.vo.ScheduleDTO;

@Service
public class ScheduleService {

	@Autowired
	private SqlSession sqlsession;

	/*
	날 짜 : 2019. 08. 06.
	작성자 : 김 정 권
	기 능 : 현재 날짜와 트레이너 아이디를 받아서 현재 날짜가 포함된 주의 월 ~ 일 간의 모든 해당 트레이너의 수강생들의 PT일정을 가져옴 
	*/
	public ArrayList<ScheduleDTO> getAllWeekSchedule(String trainerId, String today) {

		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("trainerId", trainerId);
		map.put("today", today);
		
		ArrayList<ScheduleDTO> scheduledto = dao.getAllWeekSchedule(map);
		
		return scheduledto;
	}
	
	/*
	날 짜 : 2019. 08. 06.
	작성자 : 김 정 권
	기 능 : 특정 수강생의 아이디와 날짜를 받아서 해당 날짜의 해당 수강생의 모든 운동 루틴을 가져옴 
	*/
	public ArrayList<RoutineDTO> getDailyRoutine(String memberId, String today) {
		
		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("memberId", memberId);
		map.put("today", today);
		
		ArrayList<RoutineDTO> routinedto = dao.getDailyRoutine(map);
		
		return routinedto;
	}
	
	/*
	날 짜 : 2019. 08. 06.
	작성자 : 김 정 권
	기 능 : 특정 수강생의 아이디와 날짜를 받아서 해당 날짜가 포함된 주의 월요일부터 일요일까지의 해당 수강생의 모든 운동 루틴을 가져옴 
	*/
	public HashMap<String, ArrayList<RoutineDTO>> getWeekRoutine(String memberId, String today) {
		
		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		HashMap<String, String> parammap = new HashMap<String, String>();
		parammap.put("memberId", memberId);
		parammap.put("today", today);
		
		ArrayList<RoutineDTO> routinedto = dao.getWeekRoutine(parammap);
		
		// 동일한 날짜의 일정들은 중복을 제외하고 종류별로 담기게끔 set에 반복으로 add 
		// 쿼리에서 distinct와 같은 맥락 
		HashSet<String> dateset = new HashSet<String>();
		for(int i = 0; i < routinedto.size(); i++) {
			dateset.add(routinedto.get(i).getDate());
		}
		
		// 아래 반복 돌면서 매핑해줄 컬렉션 미리 생성 
		HashMap<String, ArrayList<RoutineDTO>> resultmap = new HashMap<String, ArrayList<RoutineDTO>>(); 
		ArrayList<RoutineDTO> dayroutinelist = null;
		String tempDate = null;
		
		// 위에서 넣은 set을 반복 돌면서(= 날짜별로 반복 돌게 됨) 날짜와 해당 날짜의 루틴 1:1 로 매핑되도록 처리
		// ex: key : value => 20190801 : 20190801의 루틴 모두 
		for(String date : dateset) {
		dayroutinelist = new ArrayList<RoutineDTO>();
			for(int i = 0; i < routinedto.size(); i++) {
				
				// 전체 루틴을 가져온 것을 반복 돌면서 현재 set의 반복 날짜와 일치하는 것들만 모아서 ArrayList에 insert
				if(date.equals(routinedto.get(i).getDate())) {
					dayroutinelist.add(routinedto.get(i));
				}
				
				// 날짜구분없이 전체 날짜의 루틴 반복에서 마지막 원소라면 map에 해당 ArrayList를 put 
				// 결과적으로 key : value 는 => 20190801 : 20190801의 모든 운동 루틴이 담긴 ArrayList 가 된다  
				if(i == routinedto.size() - 1) {
					resultmap.put(date, dayroutinelist);
				}
			}
		}
		
		return resultmap;

	}
	
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 운동 루틴 작성시 sets수 변경 버튼 클릭시 DB상의 sets 수 업데이트 
	*/
	public int changeRoutineSets(String memberId, String date, String exercisename, String sets) {
		
		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		
		HashMap<String, String> parammap = new HashMap<String, String>();
		parammap.put("memberId", memberId);
		parammap.put("date", date);
		parammap.put("exercisename", exercisename);
		parammap.put("sets", sets);
		
		int result = dao.changeRoutineSets(parammap);
		
		return result;
		
	}
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 운동 루틴 작성시 reps수 변경 버튼 클릭시 DB상의 reps 수 업데이트 
	 */
	public int changeRoutineReps(String memberId, String date, String exercisename, String reps) {
		
		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		
		HashMap<String, String> parammap = new HashMap<String, String>();
		parammap.put("memberId", memberId);
		parammap.put("date", date);
		parammap.put("exercisename", exercisename);
		parammap.put("reps", reps);
		
		int result = dao.changeRoutineReps(parammap);
		
		return result;
		
	}
	
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 예정된 PT 스케쥴 우클릭하여 "수업완료" 버튼 누르면 해당 수업을 완료 처리(DB상의 완료 구분자 1로 처리)
	 */
	public int updateScheduleFinishDncd(String memberId, String date, String finish_dncd) {
		
		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		
		HashMap<String, String> parammap = new HashMap<String, String>();
		parammap.put("memberId", memberId);
		parammap.put("date", date);
		parammap.put("finish_dncd", finish_dncd);
		
		int result = dao.updateScheduleFinishDncd(parammap);
		
		return result;
		
	}
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 예정된 PT 스케쥴 우클릭하여 "취소" 버튼 누르면 해당 수업을 취소 처리
	 */
	public int deleteSchedule(String memberId, String date) {
		
		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		
		HashMap<String, String> parammap = new HashMap<String, String>();
		parammap.put("memberId", memberId);
		parammap.put("date", date);
		
		deleteRoutinebyDate(memberId, date);
		int result = dao.deleteSchedule(parammap);
		
		return result;
		
	}
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 해당 날짜의 해당 수강생의 루틴 삭제 
	 */
	public int deleteRoutinebyDate(String memberId, String date) {
		
		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		
		HashMap<String, String> parammap = new HashMap<String, String>();
		parammap.put("memberId", memberId);
		parammap.put("date", date);
		
		int result = dao.deleteRoutinebyDate(parammap);
		
		return result;
		
	}
	
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 해당 날짜의 해당 수강생 루틴 중 삭제하고 싶은 운동 종류를 하루 루틴에서 삭제 
	 */
	public int deleteRoutinebyExercise(String memberId, String date, String exercisename) {
		
		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		
		HashMap<String, String> parammap = new HashMap<String, String>();
		parammap.put("memberId", memberId);
		parammap.put("date", date);
		parammap.put("exercisename", exercisename);
		
		int result = dao.deleteRoutinebyExercise(parammap);
		
		return result;
		
	}
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 해당 날짜에 해당 수강생의 루틴 생성 
	 */
	public int insertRoutine(RoutineDTO routinedto) {
		
		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		
		int result = dao.insertRoutine(routinedto);
		
		return result;
		
	}
	
	/*  
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 해당 날짜의 해당 수강생 스케줄을 드래그앤 드롭으로 변경시 원하는 날짜의 원하는 시간으로 변경 
	 */
	public int chanegeSchedule(String phonenum, String before_date, String after_date,	String start_time, String end_time, String finish_dncd) {
		
		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		
		HashMap<String, String> parammap = new HashMap<String, String>();
		parammap.put("phonenum", phonenum);
		parammap.put("before_date", before_date);
		parammap.put("after_date", after_date);
		parammap.put("start_time", start_time);
		parammap.put("end_time", end_time);
		parammap.put("finish_dncd", finish_dncd);
		
		
		// 동일 날짜 내 시각 변경이 아니라 날짜가 변경되는 경우 DB구조상 외래키 제약에 걸리므로 schedule테이블을 참조하고 있는 routine테이블의 
		// 해당 날짜 routine을 삭제한 후 schedule의 날짜 변경을 하고 삭제했던 routine을 변경된 날짜로 다시 insert 해주어야 
		int result = 0;
		if(!before_date.equals(after_date)) {
			
			ArrayList<RoutineDTO> routinelist = getDailyRoutine(phonenum, before_date);
			deleteRoutinebyDate(phonenum, before_date);
			result = dao.chanegeSchedule(parammap);
			
			for(RoutineDTO routinedto : routinelist) {
				routinedto.setDate(after_date);
				dao.insertRoutine(routinedto);
			}
			
		}else {
			result = dao.chanegeSchedule(parammap);
			
		}
		
		return result;
		
	}

	
}
