package com.healthnote.statistic.dao;

import java.util.ArrayList;

import com.healthnote.vo.MemberDTO;
import com.healthnote.vo.MemoDTO;
import com.healthnote.vo.TargetProportionDTO;

public interface StatisticDAO {

	public ArrayList<MemberDTO> getMembersOfTra(String trainerId);
	public ArrayList<TargetProportionDTO> getTargetProportion(String phonenum);
	public float getUnusedPtProportion(String phonenum);
	public ArrayList<MemoDTO> getMemos(String phonenum);
	
}