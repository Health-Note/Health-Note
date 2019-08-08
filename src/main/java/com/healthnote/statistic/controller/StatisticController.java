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

import com.healthnote.statistic.dao.StatisticDAO;
import com.healthnote.statistic.service.StatisticService;
import com.healthnote.vo.MemberDTO;
import com.healthnote.vo.MemoDTO;
import com.healthnote.vo.TargetProportionDTO;
import com.healthnote.vo.WeightAndBmiDTO;


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

		String phonenum = (String) data.get("memberId");
		
		ArrayList<TargetProportionDTO> targetProportion = StatisticService.getTargetProportion(phonenum);
		float getUnusedPtProportion = StatisticService.getUnusedPtProportion(phonenum);
		ArrayList<MemoDTO> memoList = StatisticService.getMemos(phonenum);
		ArrayList<WeightAndBmiDTO> weightAndBmiList = StatisticService.getWeightAndBmi(phonenum);
		
		model.addAttribute("targetProportion", targetProportion);
		model.addAttribute("getUnusedPtProportion", getUnusedPtProportion);
		model.addAttribute("memoList", memoList);
		model.addAttribute("weightAndBmiList", weightAndBmiList);
		
		return jsonview;
	}
	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : 해당 메모를 삭제처리      
	 */
	@RequestMapping(value = "/deleteMemo", method = RequestMethod.POST)
	public View deleteMemo(HttpSession session, Model model, @RequestBody Map<String, Object> data){
		
		int result = StatisticService.deleteMemo(Integer.parseInt((String) data.get("no")));
		model.addAttribute("result", result);
		return jsonview; 
	}
	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : 해당 메모의 완료여부 변경       
	 */
	@RequestMapping(value = "/updateMemoFinish", method = RequestMethod.POST)
	public View updateMemoFinish(HttpSession session, Model model, @RequestBody Map<String, Object> data){
	
		int finish_dncd = Integer.parseInt((String) data.get("finish_dncd"));
		int no = Integer.parseInt((String) data.get("no"));
		
		int result = StatisticService.updateMemoFinish(finish_dncd, no);
		model.addAttribute("result", result);
		return jsonview; 
	}
	
	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : 메모 insert       
	 */
	@RequestMapping(value = "/insertMemo", method = RequestMethod.POST)
	public View insertMemo(HttpSession session, Model model, @RequestBody Map<String, Object> data){
		
		MemoDTO paramDto = new MemoDTO();
		paramDto.setText((String) data.get("text"));
		paramDto.setFinish_dncd(Integer.parseInt((String) data.get("finish_dncd")));
		paramDto.setPhonenum((String) data.get("phonenum"));
		
		int result = StatisticService.insertMemo(paramDto);
		model.addAttribute("result", result);
		
		return jsonview; 
		
	}
	
}
