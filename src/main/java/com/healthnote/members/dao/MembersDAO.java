package com.healthnote.members.dao;

import java.util.ArrayList;
import java.util.HashMap;

import com.healthnote.vo.MemberAndFixedScheduleDTO;
import com.healthnote.vo.MemberDTO;

public interface MembersDAO {

	public ArrayList<MemberAndFixedScheduleDTO> getMemberAndFixedSchedule(String trainerId);
	public int deleteMember(String phonenum);
	public int changeMemberInfo(MemberDTO paramdto);
	
}
