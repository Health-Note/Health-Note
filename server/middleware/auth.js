const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    // 헤더에서 토큰을 가져온다.
    const token = req.header('x-auth-token');
    // 토큰이 있는지 확인한다.
    if (!token) {
        return res.status(401).json({ msg: "토큰이 없습니다. 인증이 거부되었습니다." });
    }
    try {
        const decoded = jwt.verify(token, 'jwtSecret');
        req.trainer = decoded.trainer.trainer_id; // 페이로드의 trainer정보를 req.trainer에 담는다.
        next();
    } catch(err) {
        res.status(401).json({msg: 'token is not valid'});
    }
}