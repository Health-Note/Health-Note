package com.healthnote.common.dao;

import com.healthnote.vo.TrainerUpgradedDTO;

public interface CommonDAO {

	public int insertTrainer(TrainerUpgradedDTO paramdto);	
	public TrainerUpgradedDTO getUser(String email);
	
}
