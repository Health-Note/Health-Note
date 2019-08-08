package com.healthnote.statistic.controller;

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

import com.healthnote.statistic.service.StatisticService;
import com.healthnote.vo.MemberDTO;
import com.healthnote.vo.MemoDTO;
import com.healthnote.vo.TargetProportionDTO;


@Controller
public class StatisticController {
	
	@Autowired
	private View jsonview;
	
	@Autowired 
	private StatisticService StatisticService;
	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : 좌측 Statistic클릭시 해당 로그인 트레이너의 회원들 명단을 가져옴 
	*/
	@RequestMapping(value = "/getMembersOfTra", method = RequestMethod.POST)
	public View getMembersOfTra(HttpSession session, Model model) {
		
		String trainerId = (String) session.getAttribute("trainerId");
		ArrayList<MemberDTO> list = StatisticService.getMembersOfTra(trainerId);
		model.addAttribute("memberlist", list);

		return jsonview;
	}
	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : 수강생 클릭시 해당 수강생의 여러가지 정보들 가져옴 (부위별 비율 / 남은 피티 수 비율 / 메모 / 몸무게 / BMI)  
	*/
	@RequestMapping(value = "/getBasicsForStatistic", method = RequestMethod.POST)
	public View getBasicsForStatistic(HttpSession session, Model model, @RequestBody Map<String, Object> data) {

		System.out.println("getBasicsForStatistic controller");
		String phonenum = (String) data.get("memberId");
		
		ArrayList<TargetProportionDTO> targetProportion = StatisticService.getTargetProportion(phonenum);
		float getUnusedPtProportion = StatisticService.getUnusedPtProportion(phonenum);
		ArrayList<MemoDTO> memoList = StatisticService.getMemos(phonenum);
		
		model.addAttribute("targetProportion", targetProportion);
		model.addAttribute("getUnusedPtProportion", getUnusedPtProportion);
		model.addAttribute("memoList", memoList);
		
		
		
		return jsonview;
	}
	
	
	
	
	
	
}
