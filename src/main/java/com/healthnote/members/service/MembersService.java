package com.healthnote.members.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthnote.members.dao.MembersDAO;
import com.healthnote.vo.ChangeFixedScheduleDTO;
import com.healthnote.vo.CheckDayOfScheduleDTO;
import com.healthnote.vo.DeleteScheduleDTO;
import com.healthnote.vo.FixedScheduleDTO;
import com.healthnote.vo.MemberAndFixedScheduleDTO;
import com.healthnote.vo.MemberDTO;
import com.healthnote.vo.ScheduleDTO;
import com.healthnote.vo.SearchNotAvailableScheduleDTO;

@Service
public class MembersService {

	@Autowired
	private SqlSession sqlsession;

	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : 좌측 Member클릭시 해당 접속 아이디(트레이너)의 모든 회원들에 대한 정보와 정적 시간표를 같이 DTO에 담아서 가져옴  
	*/
	public ArrayList<MemberAndFixedScheduleDTO> getMemberAndFixedSchedule(String trainerId){
		
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		ArrayList<MemberAndFixedScheduleDTO>  list = dao.getMemberAndFixedSchedule(trainerId);
		
		return list;
		
	}
	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : Member(수강생) 삭제   
	*/
	public int deleteMember(String phonenum) {
		
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		int result = dao.deleteMember(phonenum);
		
		return result;
	}
	
	
	/*
	날 짜 : 2019. 8. 8.
	작성자 : 김 정 권
	기 능 : Member(수강생) 기본정보 변경   
	*/
	public int changeMemberInfo(MemberDTO paramdto) {
		
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		int result = dao.changeMemberInfo(paramdto);
		
		return result;
		
	}
	
	
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : Member(수강생) 기본정보 변경   
	*/
	public int insertMember(MemberDTO paramdto) {
		
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		int result = dao.insertMember(paramdto);

		return result;
	}
	
	
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : Member(수강생) 신규 등록 후 고정 스케줄 삽입    
	*/
	public ArrayList<ScheduleDTO> insertFixedSchedule(FixedScheduleDTO paramdto, String today) {
		
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		int result = dao.insertFixedSchedule(paramdto);
		
		ArrayList<ScheduleDTO> resultList = insertScheduleFollwingFixed(paramdto, today);
		return resultList;
		
	}
	
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : Member(수강생) 고정 스케줄 삭제     
	 */
	public int deleteFixedSchedule(FixedScheduleDTO paramdto) {
		
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		int result = dao.deleteFixedSchedule(paramdto);
		
		DeleteScheduleDTO paramDto = new DeleteScheduleDTO();
		paramDto.setDay(paramdto.getDay());
		paramDto.setPhonenum(paramdto.getPhonenum());
		result = dao.deleteSchedule(paramDto);
		
		return result;
	}
	
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : Member(수강생) 고정 스케줄 변경    
	 */
	public ArrayList<ScheduleDTO> changeFixedSchedule(ChangeFixedScheduleDTO paramdto, String today) {
	
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		int result = dao.changeFixedSchedule(paramdto);
		
		DeleteScheduleDTO paramDto = new DeleteScheduleDTO();
		paramDto.setDay(paramdto.getBefore_day());
		paramDto.setPhonenum(paramdto.getPhonenum());
		result = dao.deleteSchedule(paramDto);
		
		FixedScheduleDTO insertTargetDto = new FixedScheduleDTO();
		insertTargetDto.setDay(paramdto.getAfter_day());
		insertTargetDto.setEnd_time(paramdto.getEnd_time());
		insertTargetDto.setStart_time(paramdto.getStart_time());
		insertTargetDto.setPhonenum(paramdto.getPhonenum());
		
		ArrayList<ScheduleDTO> resultList = insertScheduleFollwingFixed(insertTargetDto, today);
		
		return resultList;
	}
	
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : Member(수강생) 고정 스케줄 삽입,수정시 가변 스케줄도 같이 변경하는데
	       변경 전에 이미 가변 스케줄 상에 해당 날짜에 해당 시간에 일정이 잡혀있는 사람들을 찾아서 배열로 가져옴 
	 */
	public ArrayList<ScheduleDTO> searchNotAvailableSchedule(SearchNotAvailableScheduleDTO paramdto){
		
		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
		ArrayList<ScheduleDTO> notAvailableScheduleList = dao.searchNotAvailableSchedule(paramdto);
		
		return notAvailableScheduleList;
		
	}

	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : 년, 월, 일 더하기 인데 일 더하기가 필요하여 가져옴 
	 */
    private static String addDate(String dt, int y, int m, int d) throws Exception  {
    	
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
 
        Calendar cal = Calendar.getInstance();
        Date date = format.parse(dt);
        cal.setTime(date);
        cal.add(Calendar.YEAR, y);      //년 더하기
        cal.add(Calendar.MONTH, m);     //년 더하기
        cal.add(Calendar.DATE, d);      //년 더하기
 
        return format.format(cal.getTime());
 
    }
    
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : 날짜 gap 계산  
	 */
    public long calDateBetweenAandB(String first_date, String second_date)
    {
        long calDateDays = 0;
        try{ // String Type을 Date Type으로 캐스팅하면서 생기는 예외로 인해 여기서 예외처리 해주지 않으면 컴파일러에서 에러가 발생해서 컴파일을 할 수 없다.
            SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
            // date1, date2 두 날짜를 parse()를 통해 Date형으로 변환.
            Date firstDate = format.parse(first_date);
            Date secondDate = format.parse(second_date);
            
            // Date로 변환된 두 날짜를 계산한 뒤 그 리턴값으로 long type 변수를 초기화 하고 있다.
            // 연산결과 -950400000. long type 으로 return 된다.
            long calDate = firstDate.getTime() - secondDate.getTime(); 
            
            // Date.getTime() 은 해당날짜를 기준으로1970년 00:00:00 부터 몇 초가 흘렀는지를 반환해준다. 
            // 이제 24*60*60*1000(각 시간값에 따른 차이점) 을 나눠주면 일수가 나온다.
            calDateDays = calDate / ( 24*60*60*1000); 
     
            calDateDays = Math.abs(calDateDays);
            System.out.println("두 날짜의 날짜 차이: " + calDateDays);
            
            }
            catch(Exception e)
            {
            	e.printStackTrace();
            }
		return calDateDays;
    }    
    
	/*
	날 짜 : 2019. 8. 9.
	작성자 : 김 정 권
	기 능 : 날짜 gap 계산  
	 */
    public ArrayList<ScheduleDTO> insertScheduleFollwingFixed(FixedScheduleDTO paramdto, String today) {
    		
    		MembersDAO dao = sqlsession.getMapper(MembersDAO.class);
    	
   			// 멤버십 만료일 가져오기 위해서 기본 memberDTO가져옴 
  			MemberDTO memberDto = dao.getMemberInfo(paramdto.getPhonenum()); 
   			String end_date = memberDto.getEnd_date(); 
   			
   			SearchNotAvailableScheduleDTO searchDto = new SearchNotAvailableScheduleDTO();
   			searchDto.setToday(today);
   			searchDto.setEnd_date(end_date);
   			searchDto.setDay(paramdto.getDay());
   			searchDto.setStart_time(paramdto.getStart_time());
   			searchDto.setEnd_time(paramdto.getEnd_time());
   			
   			// 고정 스케줄 기반으로 가변 스케줄 테이블에 스케줄들을 insert하기 전에 기존 회원들이 insert할 공간에 이미 존재하는지
   			// 체크하여 이미 해당 스케줄에 특정 회원이 있으면 해당 회원의 정보를 가져옴 
   			ArrayList<ScheduleDTO> notAvailableScheduleDTO = searchNotAvailableSchedule(searchDto);
   			for(ScheduleDTO temp_dto : notAvailableScheduleDTO) {
   				System.out.println(temp_dto.getDate());
   			}
   			
   			ArrayList<String> insertTargetDateList = new ArrayList<String>();
   			end_date = end_date.substring(0, 4) + end_date.substring(5, 7) + end_date.substring(8,10);
   			
   			// 시작일과 종료일 간격을 반복의 총 횟수로 넣어야 하므로 이를 가져옴 
   			long dateGap = calDateBetweenAandB(today, end_date);
   			for(int i = 0; i < dateGap; i++) {
   				
   				String date = null;
   				try {
   					date = addDate(today,0,0,i);
   				} catch (Exception e) {
   					e.printStackTrace();
   				} 
   				CheckDayOfScheduleDTO dto = new CheckDayOfScheduleDTO();
   				dto.setDate(date);
   				dto.setDay(paramdto.getDay());
   				
   				// 대상 날짜가 수강생이 원하는 요일인 경우이면서 다른 사람과 겹치지 않는 경우
   				// insert 대상 date로 인식하여 ArrayList에 넣어줌 
   				if(dao.checkDayOfSchedule(dto) == 1) {
   					
   					boolean flag = true;
   					for(ScheduleDTO temp_dto : notAvailableScheduleDTO) {
   						
   						// YYYY-MM-DD => YYYYMMDD
   						String compDate = temp_dto.getDate().substring(0, 4) 
   										+ temp_dto.getDate().substring(5, 7)
   										+ temp_dto.getDate().substring(8,10);
   						if(date.equals(compDate)) {
   							flag = false;
   							break;
   						}
   					}
   					if(flag) {
   						System.out.println("최종추가날짜 : " + date);
   						insertTargetDateList.add(date);
   					}
   				}
   			} // end - for
   			
   			// 최종적으로 insert 대상이 되는 날짜들을 반복 돌리면서 Schedule에 insert 
   			ScheduleDTO scheduleDto = new ScheduleDTO();
   			for(String date : insertTargetDateList) {
   				scheduleDto.setDate(date);
   				scheduleDto.setStart_time(paramdto.getStart_time());
   				scheduleDto.setEnd_time(paramdto.getEnd_time());
   				scheduleDto.setFinish_dncd(0);
   				scheduleDto.setPhonenum(paramdto.getPhonenum());
   				
   				dao.insertScheduleFollowingFixedSchedule(scheduleDto);
   			}
   			
   			return notAvailableScheduleDTO;  	
   }

}    







