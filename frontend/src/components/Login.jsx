import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Login.css'

const Login = ({setUserInfo}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }
  return(

    <>
      <div className="login">
        <div className="loginContainer">
          <h1>로그인</h1>
          <form>
            <div className="input-box">
              아이디 : <input type="text" name="username" onChange={onChangeHandler}/>
            </div>
            <div className="input-box">
              비밀번호 : <input type="text" name="password" onChange={onChangeHandler} />
            </div>
            <button className='btn' onClick={async (e) => {
              e.preventDefault()
              const response = await fetch('http://localhost:5000/user/login', {
                method: 'POST',
                headers: {
                  'Content-Type' : 'application/json'
                },
                body: JSON.stringify(user),
                credentials: 'include'
              })
              const data = await response.json()
              
              alert(data.message)
              if(data.ok){
                setUserInfo(data.user)
                navigate('/')
              }
            }}>로그인</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;