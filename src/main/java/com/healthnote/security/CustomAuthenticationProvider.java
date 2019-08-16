package com.healthnote.security;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.healthnote.vo.TrainerUpgradedDTO;

public class CustomAuthenticationProvider implements AuthenticationProvider {
	
	@Autowired
	private UserDetailsService userDeSer;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		
		String username = (String) authentication.getPrincipal();
		String password = (String) authentication.getCredentials();
		
		TrainerUpgradedDTO user = (TrainerUpgradedDTO) userDeSer.loadUserByUsername(username);

		// 비밀번호 검사 
		if(!passwordEncoder.matches(password, user.getPassword())) {
			throw new BadCredentialsException(username);
		}
		
		// 권한 가져오기 
		Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>) user.getAuthorities();
		return new UsernamePasswordAuthenticationToken(username, password, authorities);
		
	}
	
	@Override
	public boolean supports(Class<?> authentication) {
	
		return true;
	}

}
