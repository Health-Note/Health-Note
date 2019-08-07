package com.healthnote.vo;

public class RoutineDTO {

	String date;
	String phonenum;
	String exercisename;
	int sets;
	int reps;

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

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

	public int getSets() {
		return sets;
	}

	public void setSets(int sets) {
		this.sets = sets;
	}

	public int getReps() {
		return reps;
	}

	public void setReps(int reps) {
		this.reps = reps;
	}

}
