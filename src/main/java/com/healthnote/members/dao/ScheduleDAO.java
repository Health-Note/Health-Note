package com.healthnote.members.dao;

import java.util.ArrayList;
import java.util.HashMap;

import com.healthnote.vo.ScheduleDTO;

public interface ScheduleDAO {

	public ArrayList<ScheduleDTO> getAllWeekSchedule(HashMap<String, String> map);
	public String getTest(HashMap<String, String> map);
	
}
