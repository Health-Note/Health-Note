export default function validate(values) {
  let errors = {};
  console.log(values)
  if (!values.email) {
    errors.email = '이메일 주소를 입력하세요.';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = '이메일 형식이 아닙니다.';
  }

  if(!values.trainerName) {
    errors.trainerName =`트레이너 이름을 입력하세요.`;
  } else if (5 < values.trainerName.length) {
    errors.trainerName =`최대 5자까지 입력 가능합니다.`;
  } else if(2 > values.trainerName.length) {
    errors.trainerName = '최소 2자 이상 입력해주세요'
  }

  if(!values.password) {
    errors.password =`비밀번호를 입력하세요.`;
  } else if (15 < values.password.length) {
    errors.password =`최대 15자까지 입력 가능합니다.`;
  } else if(9 > values.password.length) {
    errors.password = '최소 9자 이상 입력해주세요'
  }

  if (values.password !== values.password2) {
    errors.password2 = '비밀번호가 일치하지 않습니다.'
  } else {
    errors.password2 = '';
  }

  console.log(errors)

  return errors;
};