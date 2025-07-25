import './App.css'
import MainPage from './components/MainPage'
import Header from './components/Header'
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Favorite from './components/Favorite';
import Detail from './components/Detail';

function App() {
  const [iconId, setIconId] = useState([]);
  useEffect(() => {
    localStorage.setItem('iconid', JSON.stringify(iconId));
  }, [iconId]);
  // useEffect(() => {
  //   let iconId_ = localStorage.getItem('iconid');
  //   iconId_ = JSON.parse(iconId);
  //   iconId_.filter(iconId, 1);
  //   localStorage.setItem('iconid', JSON.stringify(iconId));
  //   dispatch(setIconId(iconId));
  // })

  
  
  return (
    <>
    <Header />

    <Routes>
      {/* <Route path='/datail' element={<Detail iconId={iconId}/>} /> */}
      <Route path='/' element={<MainPage iconId={iconId} setIconId={setIconId}/>} />
      <Route path='/favorite' element={<Favorite iconId={iconId} setIconId={setIconId}/>} />
    </Routes>
    
    </>
  )
}


export default App
