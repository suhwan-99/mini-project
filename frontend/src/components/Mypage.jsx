import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Mypage.css'
import { useEffect } from "react"

const Mypage = ({userInfo, setUserInfo}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: '',
    password: '',
    nickname: '',
    email: '',
  })
  useEffect(() => {
    if (userInfo) {
      setUser({
        username: userInfo.username || '',
        password: '', 
        nickname: userInfo.nickname || '',
        email: userInfo.email || ''
      })
    }
    }, [userInfo])

    if (!userInfo) {
      return (
        <div className="mypage">
          <div className="mypageContainer">
            <h2>로그인이 필요합니다.</h2>
            <button onClick={() => navigate('/login')}>로그인하러 가기</button>
          </div>
        </div>
      )
    }
  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  return(
    <>
      <div className="mypage">
        <div className="mypageContainer">
          <h1>마이페이지</h1>
          <form>
            <div className="input-box">
              아이디 : <input type="text" name="username" value={user.username} onChange={onChangeHandler} />
            </div>
            <div className="input-box">
              비밀번호 : <input type="text" name="password" value={user.password} onChange={onChangeHandler}/>
            </div>
            <div className="input-box">
              닉네임 : <input type="text" name="nickname" value={user.nickname} onChange={onChangeHandler} />
            </div>
            <div className="input-box">
              이메일 : <input type="text" name="email" value={user.email} onChange={onChangeHandler}/>
            </div>
            <button className='edit-btn btn' type="submit" onClick={async (e) => {
              e.preventDefault()
              const response = await fetch(`http://localhost:5000/user/${userInfo.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type' : 'application/json'
                },
                body: JSON.stringify(user),
                credentials: 'include'
              })
              const data = await response.json()
              
              alert(data.message)
              if(data.ok){
                setUserInfo({
                    ...userInfo,
                    username: user.username,
                    nickname: user.nickname,
                    email: user.email
                  })
                navigate('/')
              }
            }}>수정</button>
            <button onClick={async (e) => {
              e.preventDefault()
              const response = await fetch(`http://localhost:5000/user/${userInfo.id}`, {
                method:'DELETE',
                headers: {
                  'Content-Type' : 'application/json'
                }
              })
                const data  = await response.json()
                
                  alert(data.message)
                  if(data.ok)
                    setUserInfo(null)
                    navigate('/')
                
            }} className='delete-btn btn'>탈퇴</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Mypage;