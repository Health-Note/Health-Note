package com.healthnote.vo;

public class MemoDTO {

	String text;
	int finish_dncd;
	String phonenum;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getFinish_dncd() {
		return finish_dncd;
	}

	public void setFinish_dncd(int finish_dncd) {
		this.finish_dncd = finish_dncd;
	}

	public String getPhonenum() {
		return phonenum;
	}

	public void setPhonenum(String phonenum) {
		this.phonenum = phonenum;
	}

}
