package com.healthnote.schedule.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import com.healthnote.members.dao.ScheduleDAO;
import com.healthnote.vo.ScheduleDTO;

@Service
public class ScheduleService {

	@Autowired
	private SqlSession sqlsession;

	public ArrayList<ScheduleDTO> getAllWeekSchedule(String trainerId, String today) {

		System.out.println("getAllWeekSchedule_service started");

		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("trainerId", trainerId);
		map.put("today", today);
		
		System.out.println("dao start!");
		ArrayList<ScheduleDTO> scheduledto = dao.getAllWeekSchedule(map);
		System.out.println("dao end!");
		
		System.out.println(scheduledto.size());
		
		return scheduledto;
	}
	
	public String getTest(String email) {
		
		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("email", email);
		
		System.out.println("dao start!");
		String test = dao.getTest(map);
		System.out.println("dao end!");
		
		return test;
		
		/*
		 * 심각: Servlet.service() for servlet [appServlet] in context with path [/main] threw exception 
		 * [Request processing failed; nested exception is org.mybatis.spring.MyBatisSystemException: 
		 * nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: org.springframework.jdbc.CannotGetJdbcConnectionException: 
Could not get JDBC Connection; nested exception is java.sql.SQLNonTransientConnectionException:
 Cannot load connection class because of underlying exception: com.mysql.cj.exceptions.WrongArgumentException:
  Malformed database URL, failed to parse the connection string near ';serverTimezone=UTC'.
### The error may exist in file [/Users/jungkwonkim/Desktop/jk_lab/STS_LAB/.metadata/.
plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/HealthNote/WEB-INF/classes/com/healthnote/mapper/ScheduleDAO.xml]
### The error may involve com.healthnote.members.dao.ScheduleDAO.getTest
### The error occurred while executing a query
		 * */
		
	}

}
