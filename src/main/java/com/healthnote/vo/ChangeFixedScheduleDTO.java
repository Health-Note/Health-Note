package com.healthnote.vo;

public class ChangeFixedScheduleDTO {

	private int after_day;
	private int before_day;
	private String phonenum;
	private String start_time;
	private String end_time;

	public int getAfter_day() {
		return after_day;
	}

	public void setAfter_day(int after_day) {
		this.after_day = after_day;
	}

	public int getBefore_day() {
		return before_day;
	}

	public void setBefore_day(int before_day) {
		this.before_day = before_day;
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

}
