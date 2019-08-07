package com.healthnote.vo;

public class WorkOutGoalDTO {

	String phonenum;
	String exercisename;
	int target_weight;
	int current_weight;

	public String getPhonenum() {
		return phonenum;
	}

	public void setPhonenum(String phonenum) {
		this.phonenum = phonenum;
	}

	public String getExercisename() {
		return exercisename;
	}

	public void setExercisename(String exercisename) {
		this.exercisename = exercisename;
	}

	public int getTarget_weight() {
		return target_weight;
	}

	public void setTarget_weight(int target_weight) {
		this.target_weight = target_weight;
	}

	public int getCurrent_weight() {
		return current_weight;
	}

	public void setCurrent_weight(int current_weight) {
		this.current_weight = current_weight;
	}

}
