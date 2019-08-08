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
import com.healthnote.vo.ScheduleDTO;
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
	기 능 : 수강생 클릭시 해당 수강생의 총 루틴에서 각 부위별로 운동 비율 계산하여 백분율 가져옴  
	*/
	@RequestMapping(value = "/getBasicsForStatistic", method = RequestMethod.POST)
	public View getBasicsForStatistic(HttpSession session, Model model, @RequestBody Map<String, Object> data) {

		System.out.println("getBasicsForStatistic controller");
		String phonenum = (String) data.get("memberId");
		ArrayList<TargetProportionDTO> list = StatisticService.getTargetProportion(phonenum);
		
		for(TargetProportionDTO dto : list) {
			System.out.println(dto.getTarget());
		}
		
		model.addAttribute("targetproportionlist", list);
		
		return jsonview;
	}
	
	
	/*
	 * ERROR: org.springframework.web.context.ContextLoader - Context initialization failed
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'sqlSessionFactoryBean' 
defined in ServletContext resource [/WEB-INF/spring/root-context.xml]: Invocation of init method failed; nested 
exception is org.springframework.core.NestedIOException: Failed to parse mapping resource: 'file
 [/Users/jungkwonkim/Desktop/jk_lab/STS_LAB/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/HealthNote/WEB-INF/classes/com/healthnote/mapper/StatisticDAO.xml]'; nested exception is org.apache.ibatis.builder.
 BuilderException: Error parsing Mapper XML. Cause: org.apache.ibatis.builder.BuilderException: Error resolving class. Cause: org.apache.ibatis.type.TypeException: Could not resolve type alias 'com.healthnote.vo.targetProportionDTO'.  Cause: java.lang.ClassNotFoundException: Cannot find class: com.healthnote.vo.targetProportionDTO
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1578
	 * */
	
}
