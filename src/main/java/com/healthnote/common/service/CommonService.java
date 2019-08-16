package com.healthnote.common.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthnote.common.dao.CommonDAO;
import com.healthnote.vo.TrainerUpgradedDTO;

@Service
public class CommonService {
	
	@Autowired
	private SqlSession sqlsession;
	
	/*
	날 짜 : 2019. 8. 16.
	작성자 : 김 정 권
	기 능 : 트레이너 회원 가입   
	*/
	public int insertTrainer(TrainerUpgradedDTO paramdto){
		
		CommonDAO dao = sqlsession.getMapper(CommonDAO.class);
		
		int result = dao.insertTrainer(paramdto);
		
		return result;
		
	}
	
	/*
	날 짜 : 2019. 8. 16.
	작성자 : 김 정 권
	기 능 : 트레이너 회원 가입   
	 */
	public String checkId(String email){
		
		CommonDAO dao = sqlsession.getMapper(CommonDAO.class);
		TrainerUpgradedDTO dto = dao.getUser(email);

		String id = dto.getEmail();
			
		return id;
		
	}
	
}
