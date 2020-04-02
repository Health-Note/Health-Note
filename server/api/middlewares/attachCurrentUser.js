const authService = require('../../services/auth');
const logger = require('../../loaders/logger');

// 현재는 DB이지만.. REDIS 같은걸로 전환이 필요
module.exports = async (req, res, next) => {  
  try {
    if(!req.user) {
        throw new Error('user 정보가 불확실');
    }
    const trainer = await authService.get(req.user);
    logger.info(trainer);
    
    req.currentUser = trainer;
    return next();
  } catch (err) {
    logger.error(err);
    console.log(err);
    //res.status(500).send('Server Error');
    return next(err);
  }
};
