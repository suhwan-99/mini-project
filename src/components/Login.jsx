import { useState } from 'react';
 import './Login.css';
function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [email, setEmail] = useState('');

  const [idCheck, setIdCheck] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [emailCheck, setEmailCheck] = useState('');

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const regexId = /^\w{4,12}$/;
  const regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const regexEmail = /^([a-z]+\d*)+@\w+(\.\w{2,3})+$/;

  function validateInput(value, regex, setCheck, setValid) {
    if (regex.test(value)) {
      setCheck('사용 가능합니다');
      setValid(true);
    } else {
      setCheck('사용 불가능 합니다');
      setValid(false);
    }
    if(value === ''){
      setCheck('');
    }
  };

    const idChange = (e) => {
    const value = e.target.value;
    setId(value);
    validateInput(value, regexId, setIdCheck, setIdValid);
  };

  const pwChange = (e) => {
    const value = e.target.value;
    setPw(value);
    validateInput(value, regexPw, setPwCheck, setPwValid);
  };

  const emailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateInput(value, regexEmail, setEmailCheck, setEmailValid);
  };
  return(
    <div className='login'>
      <div className='loginContainer'>
        <h1>회원 가입</h1>
        <form >
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="4~12글자 아이디 입력"
              value={id}
              onChange={idChange}
              required/>
            <p style={{color: idValid ? 'lime' : 'red'}}>{idCheck}</p>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="대소문자,숫자,특수문자 포함 8글자 이상"
              value={pw}
              onChange={pwChange}
              required/>
            <p style={{color: pwValid ? 'lime' : 'red'}}>{pwCheck}</p>
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="이메일 입력"
              value={email}
              onChange={emailChange}
              required/>
            <p style={{color: emailValid ? 'lime' : 'red'}}>{emailCheck}</p>
          </div>
          <button type="submit" className="btn" style={{border:'1px solid darkgray'}} onClick={() => {
            if(idValid && pwValid && emailValid){
              alert('회원 가입 완료');
            } else {
              alert('다시 입력해 주세요');
            }
          }}>회원 가입</button>
        </form>
      </div>
    </div>
  )
}

export default Login;