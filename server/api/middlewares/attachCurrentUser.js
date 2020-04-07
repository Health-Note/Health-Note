const authService = require('../../services/auth');

// 현재는 DB이지만.. REDIS 같은걸로 전환이 필요
module.exports = async (req, res, next) => {  
  try {
    if(!req.user) {
        return res.status(401).json({ msg: "user 정보가 불확실" });
    }
    const trainer = await authService.get(req.user);
    req.user = trainer;
    
    return next();
  } catch (err) {
    return next(err);
  }
};
