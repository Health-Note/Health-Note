package com.healthnote.members.dao;

import java.util.ArrayList;

import com.healthnote.vo.ChangeFixedScheduleDTO;
import com.healthnote.vo.FixedScheduleDTO;
import com.healthnote.vo.MemberAndFixedScheduleDTO;
import com.healthnote.vo.MemberDTO;

public interface MembersDAO {

	public ArrayList<MemberAndFixedScheduleDTO> getMemberAndFixedSchedule(String trainerId);
	public int deleteMember(String phonenum);
	public int changeMemberInfo(MemberDTO paramdto);
	public int insertMember(MemberDTO paramdto);
	public int insertFixedSchedule(FixedScheduleDTO paramdto);
	public int deleteFixedSchedule(FixedScheduleDTO paramdto);
	public int changeFixedSchedule(ChangeFixedScheduleDTO paramdto);

}
