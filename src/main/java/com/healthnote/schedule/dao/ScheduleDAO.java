package com.healthnote.schedule.dao;

import java.util.ArrayList;
import java.util.HashMap;

import com.healthnote.vo.RoutineDTO;
import com.healthnote.vo.ScheduleDTO;

public interface ScheduleDAO {

	public ArrayList<ScheduleDTO> getAllWeekSchedule(HashMap<String, String> map);
	public ArrayList<RoutineDTO> getDailyRoutine(HashMap<String, String> map);
	public ArrayList<RoutineDTO> getWeekRoutine(HashMap<String, String> map);
	public int changeRoutineSets(HashMap<String, String> map);
	public int changeRoutineReps(HashMap<String, String> map);
	public int updateScheduleFinishDncd(HashMap<String, String> map);
	public int deleteSchedule(HashMap<String, String> map);
	public int deleteRoutinebyDate(HashMap<String, String> map);
	public int deleteRoutinebyExercise(HashMap<String, String> map);
	public int insertRoutine(RoutineDTO dto);
	public int chanegeSchedule(HashMap<String, String> map);
	
}