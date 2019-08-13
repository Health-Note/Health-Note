package com.healthnote.security;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.healthnote.vo.TrainerUpgradedDTO;

public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private SqlSession sqlsession;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		System.out.println("loadUserByUsername 실행");
		System.out.println("username : " + username);
		
		TrainerDAO dao = sqlsession.getMapper(TrainerDAO.class);
		TrainerUpgradedDTO user = dao.getUser(username);
		System.out.println("user email : " + user.getUsername());
		
		if(user==null) {
			throw new InternalAuthenticationServiceException(username);
		}
		
		return user;
	}
	
}
