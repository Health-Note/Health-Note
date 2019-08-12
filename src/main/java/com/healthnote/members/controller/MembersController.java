package com.healthnote.members.controller;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.View;

import com.healthnote.members.dao.MembersDAO;
import com.healthnote.members.service.MembersService;
import com.healthnote.vo.ChangeFixedScheduleDTO;
import com.healthnote.vo.FixedScheduleDTO;
import com.healthnote.vo.MemberAndFixedScheduleDTO;
import com.healthnote.vo.MemberDTO;
import com.healthnote.vo.ScheduleDTO;
import com.healthnote.vo.SearchNotAvailableScheduleDTO;

@Controller
public class MembersController {
	
	@Autowired
	private View jsonview;
	
	@Autowired 
	private MembersService MembersService;
	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : 좌측 Member클릭시 해당 접속 아이디(트레이너)의 모든 회원들에 대한 정보와 정적 시간표를 같이 DTO에 담아서 가져옴  
	*/
	@RequestMapping(value = "/getMemberAndFixedSchedule", method = RequestMethod.POST)
	public View getMemberAndFixedSchedule(HttpSession session, Model model) {
		
		String trainerId = (String) session.getAttribute("trainerId");
		ArrayList<MemberAndFixedScheduleDTO> list = MembersService.getMemberAndFixedSchedule(trainerId);
		
		model.addAttribute("memberlist", list);

		return jsonview;
	
	}
	
	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : Member(수강생) 삭제   
	*/
	@RequestMapping(value = "/deleteMember", method = RequestMethod.POST)
	public View deleteMember(HttpSession session, Model model, @RequestBody Map<String, Object> data) {

		String phonenum = (String) data.get("memberId");
		int result = MembersService.deleteMember(phonenum);
		model.addAttribute("result", result);

		return jsonview;
	
	}
	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : Member(수강생) 기본정보 변경   
	*/
	@RequestMapping(value = "/changeMemberInfo", method = RequestMethod.POST)
	public View changeMemberInfo(HttpSession session, Model model, @RequestBody Map<String, Object> data) {

		MemberDTO paramdto = new MemberDTO();
		
		paramdto.setPhonenum((String) data.get("memberId"));
		paramdto.setName((String) data.get("name"));
		paramdto.setGender(Integer.parseInt((String) data.get("gender")));
		paramdto.setStart_date((String) data.get("start_date"));
		paramdto.setEnd_date((String) data.get("end_date"));
		paramdto.setUnusedpt(Integer.parseInt((String) data.get("unusedpt")));
		paramdto.setUsedpt(Integer.parseInt((String) data.get("usedpt")));
		paramdto.setEmail((String) data.get("email"));
		paramdto.setHeight(Integer.parseInt((String) data.get("height")));
		
		int result = MembersService.changeMemberInfo(paramdto);
		model.addAttribute("result", result);

		return jsonview;
		
	}
	
	
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : Member(수강생) 기본정보 변경   
	*/
	@RequestMapping(value = "/insertMember", method = RequestMethod.POST)
	public View insertMember(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
	
		MemberDTO paramdto = new MemberDTO();
		
		paramdto.setPhonenum((String) data.get("memberId"));
		paramdto.setName((String) data.get("name"));
		paramdto.setGender(Integer.parseInt((String) data.get("gender")));
		paramdto.setStart_date((String) data.get("start_date"));
		paramdto.setEnd_date((String) data.get("end_date"));
		paramdto.setUnusedpt(Integer.parseInt((String) data.get("unusedpt")));
		paramdto.setUsedpt(Integer.parseInt((String) data.get("usedpt")));
		paramdto.setEmail((String) data.get("email"));
		paramdto.setHeight(Integer.parseInt((String) data.get("height")));
		
		int result = MembersService.insertMember(paramdto);
		model.addAttribute("result", result);

		return jsonview;
	}
	
	
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : Member(수강생) 신규 등록 후 고정 스케줄 삽입    
	*/
	@RequestMapping(value = "/insertFixedSchedule", method = RequestMethod.POST)
	public View insertFixedSchedule(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
		
		FixedScheduleDTO paramdto = new FixedScheduleDTO();
		
		paramdto.setDay(Integer.parseInt((String) data.get("day")));
		paramdto.setPhonenum((String) data.get("phonenum"));
		paramdto.setStart_time((String) data.get("start_time"));
		paramdto.setEnd_time((String) data.get("end_time"));
		String today = ((String) data.get("today"));
		
		// 여기서 return되는 결과 값은 고정 스케줄 입력 후 해당 스케줄에 따라 가변 스케줄에 insert를 하는데
		// 가변 스케줄 상에 이미 누군가가 스케줄이 들어가 있어서 insert 하지 못한 날짜와 시간에 대한 list이다 
		// 고정 스케줄에 대한 insert 결과와 아래 리스트를 따로 return하도록 하려면 메소드를 분절화 해야하는데 일단 이것은 나중으로 미루기로 한다 
		ArrayList<ScheduleDTO> resultList = MembersService.insertFixedSchedule(paramdto, today);
		model.addAttribute("result", resultList);
		
		return jsonview;
	}
	
	
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : Member(수강생) 고정 스케줄 삭제     
	 */
	@RequestMapping(value = "/deleteFixedSchedule", method = RequestMethod.POST)
	public View deleteFixedSchedule(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
		
		FixedScheduleDTO paramdto = new FixedScheduleDTO();
		
		paramdto.setDay(Integer.parseInt((String) data.get("day")));
		paramdto.setPhonenum((String) data.get("phonenum"));
		paramdto.setStart_time((String) data.get("start_time"));
		paramdto.setEnd_time((String) data.get("end_time"));
		
		int result = MembersService.deleteFixedSchedule(paramdto);
		model.addAttribute("result", result);
		
		return jsonview;
		
	}
	
	
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : Member(수강생) 고정 스케줄 변경    
	 */
	@RequestMapping(value = "/changeFixedSchedule", method = RequestMethod.POST)
	public View changeFixedSchedule(HttpSession session, Model model, @RequestBody Map<String, Object> data) {
		
		String today = ((String) data.get("today"));
		ChangeFixedScheduleDTO paramdto = new ChangeFixedScheduleDTO();
		
		paramdto.setAfter_day(Integer.parseInt((String) data.get("after_day")));
		paramdto.setBefore_day(Integer.parseInt((String) data.get("before_day")));
		paramdto.setPhonenum((String) data.get("phonenum"));
		paramdto.setStart_time((String) data.get("start_time"));
		paramdto.setEnd_time((String) data.get("end_time"));
		
		ArrayList<ScheduleDTO> resultList = MembersService.changeFixedSchedule(paramdto, today);
		model.addAttribute("resultList", resultList);
		
		return jsonview;
	}
	
	
	
}
