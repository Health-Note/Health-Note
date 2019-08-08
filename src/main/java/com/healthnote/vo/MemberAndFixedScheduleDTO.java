package com.healthnote.vo;

public class MemberAndFixedScheduleDTO {

	String phonenum;
	String name;
	int gender;
	String start_date;
	String end_date;
	int unusedpt;
	int usedpt;
	String email;
	int height;
	int day;
	String start_time;
	String end_time;

	public String getPhonenum() {
		return phonenum;
	}

	public void setPhonenum(String phonenum) {
		this.phonenum = phonenum;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getGender() {
		return gender;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}

	public String getStart_date() {
		return start_date;
	}

	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}

	public String getEnd_date() {
		return end_date;
	}

	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}

	public int getUnusedpt() {
		return unusedpt;
	}

	public void setUnusedpt(int unusedpt) {
		this.unusedpt = unusedpt;
	}

	public int getUsedpt() {
		return usedpt;
	}

	public void setUsedpt(int usedpt) {
		this.usedpt = usedpt;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getDay() {
		return day;
	}

	public void setDay(int day) {
		this.day = day;
	}

	public String getStart_time() {
		return start_time;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}

	public String getEnd_time() {
		return end_time;
	}

	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}

}
