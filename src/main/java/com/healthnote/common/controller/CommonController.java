package com.healthnote.common.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.View;

import com.healthnote.common.service.CommonService;
import com.healthnote.members.service.MembersService;
import com.healthnote.vo.MemberAndFixedScheduleDTO;
import com.healthnote.vo.TrainerUpgradedDTO;

@Controller
public class CommonController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder; 
	
	@Autowired
	private CommonService service;
	
	/*
	날 짜 : 2019. 8. 16.
	작성자 : 김 정 권
	기 능 : 트레이너 회원 가입   
	*/
	@RequestMapping(value = "/insertTrainer", method = RequestMethod.POST)
	public View insertTrainer(HttpSession session, Model model, TrainerUpgradedDTO paramdto) {
		
		paramdto.setPassword(bCryptPasswordEncoder.encode(paramdto.getPassword()));
		System.out.println(paramdto.getPassword());
		int result = service.insertTrainer(paramdto);
		
		model.addAttribute("result", result);

		return jsonview;
	
	}
	
	/*
	날 짜 : 2019. 8. 16.
	작성자 : 김 정 권
	기 능 : 트레이너 회원 가입시 ID중복체크  
	*/
	@RequestMapping(value = "/checkId", method = RequestMethod.POST)
	public View checkId(HttpSession session, Model model, String email) {
		
		String id = service.checkId(email);
		int result = 0;
		if(id.equals(email)) {
			result = 1;
		}
		model.addAttribute("result", result);

		return jsonview;
	
	}
	
	/*
	날 짜 : 2019. 8. 16.
	작성자 : 김 정 권
	기 능 : 로그인 기능   
	*/
	@RequestMapping(value = "/loginSuccess", method = RequestMethod.GET)
	public String loginSuccess(HttpSession request, Model model) {
		
		System.out.println("loginSuccess");
		
		return "home";
		
	}
	
	// TEST -> 수정 필요 
	@RequestMapping(value = "/welcomeLogin", method = RequestMethod.GET)
	public String welcomeLogin(HttpSession request, Model model) {
		
		System.out.println("welcomeLogin");
		
	return "loginpage";
	
	}
	
	// TEST -> 수정 필요 
	@RequestMapping(value = "/joinGo", method = RequestMethod.GET)
	public String joinGo(HttpSession session, Model model, String email) {

		return "join";
	
	}

	// TEST -> 수정 필요 
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String welcomeHome(HttpSession request, Model model) {
		
		System.out.println("welcomeHome");
		
		return "home";
		
	}
	
}
