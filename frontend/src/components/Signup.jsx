import { useState } from 'react';
import './Signup.css';
import {useNavigate} from "react-router-dom"


function Signup() {
  const navigate = useNavigate()
  
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  const [idCheck, setIdCheck] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [nicknameCheck, setNicknameCheck] = useState('');

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);

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

  
  const nicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    if (value.length >= 2 && value.length <= 12) {
      setNicknameCheck('');
      setNicknameValid(true);
    } else {
      setNicknameCheck('2~12글자 사이로 입력하세요');
      setNicknameValid(false);
    }
  };

    const checkIdDuplicate = async () => {
    if (!idValid) {
      alert('아이디를 올바르게 입력하세요.');
      return;
    }
    const response = await fetch('http://localhost:5000/user/check_id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const data = await response.json();
    setIdCheck(data.message);
    setIdValid(data.ok);
  };

    const checkNicknameDuplicate = async () => {
    if (!nicknameValid) {
      alert('닉네임을 올바르게 입력하세요.');
      return;
    }
    const response = await fetch('http://localhost:5000/user/check_nickname', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname })
    });
    const data = await response.json();
    setNicknameCheck(data.message);
    setNicknameValid(data.ok);
  };


  return(
    <div className='signup'>
      <div className='signupContainer'>
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
            <button type='button' onClick={checkIdDuplicate}>중복확인</button>
          </div>

          <div className="input-box">
            <input
              type="text"
              name="password"
              placeholder="대소문자,숫자,특수문자 포함 8글자 이상"
              value={pw}
              onChange={pwChange}
              required/>
            <p style={{color: pwValid ? 'lime' : 'red'}}>{pwCheck}</p>
          </div>

          <div className="input-box">
            <input
              type="text"
              name="email"
              placeholder="이메일 입력"
              value={email}
              onChange={emailChange}
              required/>
            <p style={{color: emailValid ? 'lime' : 'red'}}>{emailCheck}</p>
          </div>

          <div className="input-box">
            <input
              type="text"
              name="nickname"
              placeholder="닉네임 입력"
              onChange={nicknameChange}
              required/>
            <p style={{color: emailValid ? 'lime' : 'red'}}>{nicknameCheck}</p>
            <button type='button' onClick={checkNicknameDuplicate}>중복확인</button>

          </div>
          <button type="submit" className="btn" style={{border:'1px solid darkgray'}} onClick={async (e) => {
            e.preventDefault();
            const user = {
                            username: id,
                            password: pw,
                            email: email,
                            nickname: nickname,
                          };
            const response = await fetch('http://localhost:5000/user/signup' ,{
                              method: 'POST',
                              headers: {
                                      'Content-Type' : 'application/json'
                                       },
                              body: JSON.stringify(user)
                            });
            const data = await response.json()
        
            alert(data.message)
            if(data.ok)
              navigate('/')
            
          }}>회원 가입</button>
        </form>
      </div>
    </div>
  )
}

export default Signup