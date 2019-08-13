package com.healthnote.security;

import com.healthnote.vo.TrainerUpgradedDTO;

public interface TrainerDAO {

	public TrainerUpgradedDTO getUser(String email);
	
}
