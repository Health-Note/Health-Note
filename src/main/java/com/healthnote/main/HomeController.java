package com.healthnote.main;

import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

@Controller
public class HomeController {
	
	@Autowired
	private View jsonview;
	
	@RequestMapping(value = "/hihi", method = RequestMethod.GET)
	@ResponseBody
	public View welcomeGet(HttpSession request, Model model) {
		System.out.println("get!!!!!");
		
	return jsonview;
	
	}
	
	@RequestMapping(value = "/postTEST", method = RequestMethod.POST)
	@ResponseBody
	public View welcomePost(HttpSession request, Model model) {
		
		System.out.println("welcome!!!!!!!!!");
		model.addAttribute("emp1", 1);
		model.addAttribute("emp2", 2);
		
	return jsonview;
	
	}
	
}
