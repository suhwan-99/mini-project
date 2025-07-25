import { useState } from 'react';
import Place from './place';
import Carousel from './Carousel';
function MainPage({iconId, setIconId}) {

  return(
    <>
      <Carousel />
      <div className='bar'></div>
      <div className='container' >
        <div className='row'>
            <Place iconId={iconId} setIconId={setIconId}/>
        </div>
      </div>
    </>
  )
}

export default MainPage;