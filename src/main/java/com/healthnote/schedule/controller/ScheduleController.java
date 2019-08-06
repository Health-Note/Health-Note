package com.healthnote.schedule.controller;

import com.healthnote.schedule.service.ScheduleService;
import com.healthnote.vo.RoutineDTO;
import com.healthnote.vo.ScheduleDTO;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

@Controller
public class ScheduleController {
	
	@Autowired
	private View jsonview;
	
	@Autowired 
	private ScheduleService ScheduleService;
	
	/*
	날 짜 : 2019. 08. 06.
	작성자 : 김 정 권
	기 능 : 좌측 네비게이션에서 schedule클릭시 화면에 뿌려주는 데이터들 가져옴 
	*/
	@RequestMapping(value = "/sendBasicsForSchedule", method = RequestMethod.GET)
	public View getBasicsForSchedule(HttpSession session, Model model) {
	
		String trainerId = (String) session.getAttribute("trainerId");
		String today = (String) session.getAttribute("today");
		
		ArrayList<ScheduleDTO> scheduleList = ScheduleService.getAllWeekSchedule(trainerId, today);
		model.addAttribute("ptschedule", scheduleList);
		
		return jsonview;
	
	}
	
	/*
	날 짜 : 2019. 08. 06.
	작성자 : 김 정 권
	기 능 : 특정 수강생의 아이디와 날짜를 받아서 해당 날짜의 해당 수강생의 모든 운동 루틴을 가져옴 
	*/
	@RequestMapping(value = "/getDailyRoutine", method = RequestMethod.GET)
	public View getDailyRoutine(HttpSession session, Model model, String memberId) {
	
		System.out.println("getDailyRoutine started");
		String today = (String) session.getAttribute("today");
		
		ArrayList<RoutineDTO> routinelist = ScheduleService.getDailyRoutine(memberId, today);
		model.addAttribute("routinelist", routinelist);
		
		return jsonview;
	}
	
	
	@RequestMapping(value = "/getTest", method = RequestMethod.GET)
	public View test(HttpSession session, Model model, String email) {
	
			
		String tmp = ScheduleService.getTest(email);
		model.addAttribute("temp", tmp);
		
		return jsonview;
	
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public View welcome(HttpSession session, Model model, String email) {
	
		System.out.println("login fini");
		
		session.setAttribute("trainerId", "surhommekim@gmail.com");
		session.setAttribute("today", "20190807");
		
		return jsonview;
	
	}
	
	
	

	/*1.    메인UI에서 스케줄 메뉴 클릭시 프론트 화면구성을 위한 데이터를 리턴함
			라우터명: /sendBasicsForSchedule (GET)
			요청: 트레이너 이메일
			응답:  트레이너 보유 회원전체, 부위별 전체 운동들, 최근일주일운동(운동명,세트수,반복수)
			예시 리턴 JSON:
			{
			   보유회원전체:
			         [{ 이름: "김정권", 시작시간: "1730", 종료시간:"1830", 수업완료여부: true }, { }, { }, ... ],
			   부위별 운동들: 
			         { 가슴: ["벤체프레스", "팩덱플라이"], 등: [""], 하체: [""], 어깨: [""],  ... },
			    최근일주일운동: {
			               2019.08.02 : [
			                     벤치프레스: { 세트: 3, 반복: 15 },
			                     푸쉬업: { 세트:  "", 반복: "" },
			                     인클라인벤치프레스: {""}
			                   ],
			                2: [ ],
			                3: [ ], ... // 1~7은 월화수목금토일을 의미함
			                    }
 }

	 * 
	 * */
	
	/*
	@RequestMapping(value = "/postTEST", method = RequestMethod.POST)
	@ResponseBody
	public View welcome(HttpSession request, Model model) {
		
		System.out.println("welcome!!!!!!!!!");
		model.addAttribute("emp1", 1);
		model.addAttribute("emp2", 2);
		
	return jsonview;
	
	}
    */
	
	
}
