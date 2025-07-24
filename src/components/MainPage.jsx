import { useState } from 'react';
import Place from './place';
import Carousel from './Carousel';
function MainPage() {

  return(
    <>
      <Carousel />
      <br />
      <div className='container' >
        <div className='row'>
            <Place />
        </div>
      </div>
    </>
  )
}

export default MainPage;