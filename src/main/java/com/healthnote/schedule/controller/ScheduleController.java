package com.healthnote.schedule.controller;

import com.healthnote.schedule.service.ScheduleService;
import com.healthnote.vo.ExerciseDTO;
import com.healthnote.vo.RoutineDTO;
import com.healthnote.vo.ScheduleDTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
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
	기 능 : 좌측 네비게이션에서 schedule클릭시 화면에 뿌려주는 데이터들 가져옴 (상단의 운동 스케줄 표 밖에 없음)
	*/
	@RequestMapping(value = "/sendBasicsForSchedule", method = RequestMethod.GET)
	public View getBasicsForSchedule(HttpSession session, Model model) {
	
		String trainerId = (String) session.getAttribute("trainerId");
		String today = (String) session.getAttribute("today");
		
		ArrayList<ScheduleDTO> scheduleList = ScheduleService.getAllWeekSchedule(trainerId, today);
		model.addAttribute("ptschedule", scheduleList);
		
		ArrayList<ExerciseDTO> exerciseList = ScheduleService.getAllExercise();
		model.addAttribute("exerciseList", exerciseList);
		
		return jsonview;
	
	}
	
	/*
	날 짜 : 2019. 08. 06.
	작성자 : 김 정 권
	기 능 : 특정 수강생의 아이디와 날짜를 받아서 해당 날짜의 해당 수강생의 모든 운동 루틴을 가져옴 
	*/
	@RequestMapping(value = "/getDailyRoutine", method = RequestMethod.POST)
	public View getDailyRoutine(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
	
		String today = (String) session.getAttribute("today");
		String memberId = (String) data.get("memberId");
		
		ArrayList<RoutineDTO> routinelist = ScheduleService.getDailyRoutine(memberId, today);
		model.addAttribute("routinelist", routinelist);
		
		return jsonview;
	}
	
	/*
	날 짜 : 2019. 08. 06.
	작성자 : 김 정 권
	기 능 : 특정 수강생의 아이디와 날짜를 받아서 해당 날짜가 포함된 주의 월요일부터 일요일까지의 해당 수강생의 모든 운동 루틴을 가져옴 
	*/
	@RequestMapping(value = "/getWeekRoutineOfStu", method = RequestMethod.POST)
	public View getWeekRoutineOfStu(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
	
		String today = (String) session.getAttribute("today");
		String memberId = (String) data.get("memberId");
		
		// 날짜 : 해당 날짜의 루틴들  과 같은 모양새로 json을 매핑해주기 위한 반복문 
		HashMap<String, ArrayList<RoutineDTO>> resultmap = ScheduleService.getWeekRoutine(memberId, today);
		for(String key : resultmap.keySet()) {
			model.addAttribute(key, resultmap.get(key));
		}
		
		return jsonview;
	}
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 상단 운동스케줄에서 특정 날짜 클릭시 해당 날짜가 포함된 주의 월요일 ~ 일요일에 대한 모든 수강생들의 PT 스케줄을 가져옴 
	*/
	@RequestMapping(value = "/getWeekRoutineOfTra", method = RequestMethod.POST)
	public View getWeekRoutineOfTra(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
	
		String trainerId = (String) session.getAttribute("trainerId");
		String date = (String) data.get("date");
		
		ArrayList<ScheduleDTO> scheduleList = ScheduleService.getAllWeekSchedule(trainerId, date);
		model.addAttribute("ptschedule", scheduleList);
		
		return jsonview;
	
	}
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 운동 루틴 작성시 sets수 변경 버튼 클릭시 DB상의 sets 수 업데이트 
	*/
	@RequestMapping(value = "/changeRoutineSets", method = RequestMethod.POST)
	public View changeRoutineSets(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
	
		String memberId = (String) data.get("memberId");
		String date = (String) data.get("date");
		String exercisename = (String) data.get("exercisename");
		String sets = (String) data.get("sets");
		
		int result = ScheduleService.changeRoutineSets(memberId, date, exercisename, sets);
		model.addAttribute("result", result);
		
		return jsonview;
	
	}
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 운동 루틴 작성시 sets수 변경 버튼 클릭시 DB상의 sets 수 업데이트 
	 */
	@RequestMapping(value = "/changeRoutineReps", method = RequestMethod.POST)
	public View changeRoutineReps(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
		
		String memberId = (String) data.get("memberId");
		String date = (String) data.get("date");
		String exercisename = (String) data.get("exercisename");
		String reps = (String) data.get("reps");
		
		int result = ScheduleService.changeRoutineReps(memberId, date, exercisename, reps);
		model.addAttribute("result", result);
		
		return jsonview;
		
	}
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 예정된 PT 스케쥴 우클릭하여 "수업완료" 버튼 누르면 해당 수업을 완료 처리(DB상의 완료 구분자 1로 처리)
	 */
	@RequestMapping(value = "/updateScheduleFinishDncd", method = RequestMethod.POST)
	public View updateScheduleFinishDncd(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
		
		String memberId = (String) data.get("memberId");
		String date = (String) data.get("date");
		String finish_dncd = (String) data.get("finish_dncd");
		
		int result = ScheduleService.updateScheduleFinishDncd(memberId, date, finish_dncd);
		model.addAttribute("result", result);
		
		return jsonview;
		
	}
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 예정된 PT 스케쥴 우클릭하여 "취소" 버튼 누르면 해당 수업을 삭제 처리 
	 */
	@RequestMapping(value = "/deleteSchedule", method = RequestMethod.POST)
	public View deleteSchedule(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
		
		String memberId = (String) data.get("memberId");
		String date = (String) data.get("date");
		
		int result = ScheduleService.deleteSchedule(memberId, date);
		model.addAttribute("result", result);
		
		return jsonview;
		
	}
	
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 해당 날짜의 해당 수강생 루틴 모두 삭제  
	 */
	@RequestMapping(value = "/deleteRoutinebyDate", method = RequestMethod.POST)
	public View deleteRoutinebyDate(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
		
		String memberId = (String) data.get("memberId");
		String date = (String) data.get("date");
		
		int result = ScheduleService.deleteRoutinebyDate(memberId, date);
		model.addAttribute("result", result);
		
		return jsonview;
		
	}
	
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 해당 날짜의 해당 수강생 루틴 중 삭제하고 싶은 운동 종류를 하루 루틴에서 삭제 
	 */
	@RequestMapping(value = "/deleteRoutinebyExercise", method = RequestMethod.POST)
	public View deleteRoutinebyExercise(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
		
		String memberId = (String) data.get("memberId");
		String date = (String) data.get("date");
		String exercisename = (String) data.get("exercisename");
		
		int result = ScheduleService.deleteRoutinebyExercise(memberId, date, exercisename);
		model.addAttribute("result", result);
		
		return jsonview;
		
	}
	
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 해당 날짜의 해당 수강생 루틴중 하나의 운동 삽입 
	 */
	@RequestMapping(value = "/insertRoutine", method = RequestMethod.POST)
	public View insertRoutine(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
		
		RoutineDTO paramdto = new RoutineDTO();
		paramdto.setPhonenum((String) data.get("memberId"));
		paramdto.setDate((String) data.get("date"));
		paramdto.setExercisename((String) data.get("exercisename"));
		paramdto.setSets(Integer.parseInt((String) data.get("sets")));
		paramdto.setReps(Integer.parseInt((String) data.get("reps")));
		
		int result = ScheduleService.insertRoutine(paramdto);
		model.addAttribute("result", result);
		
		return jsonview;
		
	}
	
	/*
	날 짜 : 2019. 08. 07.
	작성자 : 김 정 권
	기 능 : 해당 날짜의 해당 수강생 스케줄을 드래그앤 드롭으로 변경시 원하는 날짜의 원하는 시간으로 변경  
	 */
	@RequestMapping(value = "/chanegeSchedule", method = RequestMethod.POST)
	public View chanegeSchedule(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
		
		String phonenum = (String) data.get("memberId");
		String before_date = (String) data.get("before_date");
		String after_date = (String) data.get("after_date");
		String start_time = (String) data.get("start_time");
		String end_time = (String) data.get("end_time");
		String finish_dncd = (String) data.get("finish_dncd");
		
		int result = ScheduleService.chanegeSchedule(phonenum, before_date, after_date, start_time, end_time, finish_dncd);
		model.addAttribute("result", result);
		
		return jsonview;
		
	}
	
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public View welcome(HttpSession session, Model model, String email) {
	
		System.out.println("login fini");
		
		session.setAttribute("trainerId", "surhommekim@gmail.com");
		session.setAttribute("today", "20190807");
		
		return jsonview;
	
	}
	
	/*
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder; 

 	memberdto.setPwd(this.bCryptPasswordEncoder.encode(memberdto.getPwd()));	
	 
	 
	--------------------------------------------------------------------------
	
	@RequestMapping(value="/login.htm",method=RequestMethod.POST)
	public String login(String mid, String pwd, Model model,HttpSession session) throws Exception {
		String ischecked = service.ischecked(mid);
		String result="";
		String msg = "";
		int newcount = 0;
		String securitypwd = service.getlogin(mid);
		if(securitypwd == null) {
			System.out.println("아이디 존재 안함");
			msg = "아이디가 존재하지 않습니다.";
			result = "login";
		}else {
			if (bCryptPasswordEncoder.matches(pwd, securitypwd)) {
				if (ischecked.equals("y")) {
					MemberDTO memberdto = service.getProfileInfoMember(mid);
					session.setAttribute("mid", mid);
					model.addAttribute("memberdto", memberdto);
					result = "main";
					int check = service.freeTrialCheck(mid);
					if (check == 1) {
						result = "login";
						msg = "2주의 무료체험기간이 만료되었습니다.";

					} else {
						///////////////이거 main.htm에 넣으면 아마 끝?
						newcount = inboxservice.newCount(mid);
						session.setAttribute("mid", mid);
						result = "main";

					}
				}
				else {
					 msg = "인증되지 않은 이메일입니다.<br>가입 당시 입력하신 E-Mail을 통해 인증해주세요";
			         result = "login";
				}
			} else {
				msg = "비밀번호가 일치하지 않습니다.";
				result = "login";
			}
		}
		model.addAttribute("newcount", newcount);
		model.addAttribute("msg", msg);
		
		  
		return result;
	}
	 
	 * */
	
	
}
