package com.healthnote.vo;

public class ScheduleDTO {

	String date;
	String phonenum;
	String start_time;
	String end_time;
	int finish_dncd;
	String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

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

	public int getFinish_dncd() {
		return finish_dncd;
	}

	public void setFinish_dncd(int finish_dncd) {
		this.finish_dncd = finish_dncd;
	}

}
