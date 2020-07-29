  /**
   * @module auth.context
   * @desc [회원가입] 유저가 입력한 데이터를 보내고 토큰을 받아온다.
   * @req trainerName, eamil, password, agreementId
   * @res 성공일 경우 토큰을 state에 담고 에러일 경우 state.error에 에러 메세지를 담는다.
   * @param formData {object} (trainerName, eamil, password, agreementId)
   */

