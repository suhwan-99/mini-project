import './App.css'
import MainPage from './components/MainPage'
import Header from './components/Header'
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Favorite from './components/Favorite';
import Detail from './components/Detail';
import Signup from './components/Signup';
import Login from './components/Login';
import Mypage from './components/Mypage';
import Recommend from './components/Recommend';

function App() {
  const [iconId, setIconId] = useState([]);
  useEffect(() => {
    localStorage.setItem('iconid', JSON.stringify(iconId));
  }, [iconId]);
  
  const [userInfo, setUserInfo] = useState(null)

  return (
    <div className='app'>
    <Header userInfo={userInfo} setUserInfo={setUserInfo} />

    
    <Routes>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/login' element={<Login setUserInfo={setUserInfo}/>}  />
      <Route path='/mypage' element={<Mypage setUserInfo={setUserInfo} userInfo={userInfo}/>}  />
      <Route path='/detail/:id' element={<Detail iconId={iconId} userInfo={userInfo}/>} />
      <Route path='/' element={<MainPage iconId={iconId} setIconId={setIconId}/>} />
      <Route path='/favorite' element={<Favorite iconId={iconId} setIconId={setIconId}/>} />
      <Route path='/recommend' element={<Recommend />}  />
    </Routes>
    
    </div>
  )
}


export default App
