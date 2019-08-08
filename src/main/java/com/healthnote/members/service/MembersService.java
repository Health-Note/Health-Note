package com.healthnote.members.service;

import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthnote.members.dao.MembersDAO;
import com.healthnote.vo.MemberAndFixedScheduleDTO;
import com.healthnote.vo.MemberDTO;

@Service
public class MembersService {

	@Autowired
	private SqlSession sqlsession;

	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : 좌측 Member클릭시 해당 접속 아이디(트레이너)의 모든 회원들에 대한 정보와 정적 시간표를 같이 DTO에 담아서 가져옴  
	*/
	public ArrayList<MemberAndFixedScheduleDTO> getMemberAndFixedSchedule(String trainerId){
		
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		ArrayList<MemberAndFixedScheduleDTO>  list = dao.getMemberAndFixedSchedule(trainerId);
		
		return list;
		
	}
	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : Member(수강생) 삭제   
	*/
	public int deleteMember(String phonenum) {
		
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		int result = dao.deleteMember(phonenum);
		
		return result;
	}
	
	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : Member(수강생) 기본정보 변경   
	*/
	public int changeMemberInfo(MemberDTO paramdto) {
		
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		int result = dao.changeMemberInfo(paramdto);
		
		return result;
		
	}
	
	
}
