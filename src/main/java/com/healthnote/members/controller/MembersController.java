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
import com.healthnote.vo.MemberAndFixedScheduleDTO;
import com.healthnote.vo.MemberDTO;

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
	
}
