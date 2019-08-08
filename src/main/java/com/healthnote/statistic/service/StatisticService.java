package com.healthnote.statistic.service;

import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonaws.services.cloudwatch.model.Statistic;
import com.healthnote.statistic.dao.StatisticDAO;
import com.healthnote.vo.MemberDTO;
import com.healthnote.vo.TargetProportionDTO;

@Service
public class StatisticService {

	@Autowired
	private SqlSession sqlsession;
	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : 좌측 Statistic클릭시 해당 로그인 트레이너의 회원들 명단을 가져옴 
	*/
	public ArrayList<MemberDTO> getMembersOfTra(String trainerId){
		
		StatisticDAO dao = sqlsession.getMapper(StatisticDAO.class);
		ArrayList<MemberDTO> list = dao.getMembersOfTra(trainerId);
				
		return list;
	}
	
	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : 수강생 클릭시 해당 수강생의 총 루틴에서 각 부위별로 운동 비율 계산하여 백분율 가져옴  
	*/
	public ArrayList<TargetProportionDTO> getTargetProportion(String phonenum){
		
		System.out.println("getBasicsForStatistic service");
		StatisticDAO dao = sqlsession.getMapper(StatisticDAO.class);
		System.out.println("1");
		ArrayList<TargetProportionDTO> list = dao.getTargetProportion(phonenum);
		System.out.println("2");
		
		return list;
	}
	
}
