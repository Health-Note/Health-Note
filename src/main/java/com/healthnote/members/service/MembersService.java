package com.healthnote.members.service;

import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthnote.members.dao.MembersDAO;
import com.healthnote.vo.ChangeFixedScheduleDTO;
import com.healthnote.vo.FixedScheduleDTO;
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
	
	
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : Member(수강생) 기본정보 변경   
	*/
	public int insertMember(MemberDTO paramdto) {
		
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		int result = dao.insertMember(paramdto);

		return result;
	}
	
	
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : Member(수강생) 신규 등록 후 고정 스케줄 삽입    
	*/
	public int insertFixedSchedule(FixedScheduleDTO paramdto) {
		
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		int result = dao.insertFixedSchedule(paramdto);

		return result;
	}
	
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : Member(수강생) 고정 스케줄 삭제     
	 */
	public int deleteFixedSchedule(FixedScheduleDTO paramdto) {
		
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		int result = dao.deleteFixedSchedule(paramdto);
		
		return result;
	}
	
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : Member(수강생) 고정 스케줄 변경    
	 */
	public int changeFixedSchedule(ChangeFixedScheduleDTO paramdto) {
	
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		int result = dao.changeFixedSchedule(paramdto);
		
		return result;
	}
	
}





