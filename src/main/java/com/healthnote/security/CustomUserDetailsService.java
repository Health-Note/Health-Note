package com.healthnote.security;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.healthnote.common.dao.CommonDAO;
import com.healthnote.vo.TrainerUpgradedDTO;

public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private SqlSession sqlsession;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		CommonDAO dao = sqlsession.getMapper(CommonDAO.class);
		TrainerUpgradedDTO user = dao.getUser(email);
		
		if(user.getAuthority().equals("user")) {
			user.setAuthority("ROLE_USER");
		}else if (user.getAuthority().equals("admin")) {
			user.setAuthority("ROLE_ADMIN");
		}
		
		if(user==null) {
			throw new InternalAuthenticationServiceException(email);
		}
		
		return user;
	}
	
}
