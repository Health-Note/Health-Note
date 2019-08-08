package com.healthnote.statistic.dao;

import java.util.ArrayList;
import java.util.HashMap;

import com.healthnote.vo.MemberDTO;
import com.healthnote.vo.MemoDTO;
import com.healthnote.vo.TargetProportionDTO;
import com.healthnote.vo.WeightAndBmiDTO;

public interface StatisticDAO {

	public ArrayList<MemberDTO> getMembersOfTra(String trainerId);
	public ArrayList<TargetProportionDTO> getTargetProportion(String phonenum);
	public float getUnusedPtProportion(String phonenum);
	public ArrayList<MemoDTO> getMemos(String phonenum);
	public ArrayList<WeightAndBmiDTO> getWeightAndBmi(String phonenum);
	public int deleteMemo(int no);
	public int updateMemoFinish(HashMap<String, Integer> map);
	public int insertMemo(MemoDTO memoDto);
	
}