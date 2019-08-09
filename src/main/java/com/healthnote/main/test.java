package com.healthnote.main;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class test {

	public static void main(String[] args) {
		
		String temp = "2019-12-31"; 
		String result = temp.substring(0, 4) + temp.substring(5, 7) + temp.substring(8,10);
		System.out.println(result);
		

	}

	
}
