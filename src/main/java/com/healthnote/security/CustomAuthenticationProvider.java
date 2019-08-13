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
		
		System.out.println("authenticate 실행");
			
		String username = (String) authentication.getPrincipal();
		String password = (String) authentication.getCredentials();
		
		System.out.println("username : " + username);
		System.out.println("password : " + password);
		
		TrainerUpgradedDTO user = (TrainerUpgradedDTO) userDeSer.loadUserByUsername(username);
		
		System.out.println("user email : " + user.getUsername());
		
		/*
		if(!user.isEnabled() || !user.isCredentialsNonExpired()) {
		throw new AuthenticationCredentialsNotFoundException(username);
		}
		
		Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>) user.getAuthorities();
		System.out.println("user.getAuthorities(); 잘 실행됨");
		if(!passwordEncoder.matches(password, user.getPassword())) {
			throw new BadCredentialsException(username);
		}
		
		System.out.println("authorities : " + authorities);
		
		return new UsernamePasswordAuthenticationToken(username, password, authorities);
		*/
		
		return null;

	}
	
	@Override
	public boolean supports(Class<?> authentication) {
	
		return true;
	}
	
	/*
	@Resource(name="userSer")
	private UserService userSer;
	
	@Autowired
	private UserDetailsService userDeSer;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@SuppressWarnings("unchecked")
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		
		String username = (String) authentication.getPrincipal();
		String password = (String) authentication.getCredentials();
		
		
		CustomUserDetails user = (CustomUserDetails) userDeSer.loadUserByUsername(username);
		
//		if(!user.isEnabled() || !user.isCredentialsNonExpired()) {
//			log.debug("isEnabled or isCredentialsNonExpired :::::::: false!");
//			throw new AuthenticationCredentialsNotFoundException(username);
//		}
		
		Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>) user.getAuthorities();
		
		
//		if(!passwordEncoder.matches(password, user.getPassword())) {
//			log.debug("matchPassword :::::::: false!");
//			throw new BadCredentialsException(username);
//		}
		
		
		return new UsernamePasswordAuthenticationToken(username, password, authorities);
	}
*/

}
