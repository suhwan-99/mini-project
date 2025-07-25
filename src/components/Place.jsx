import { useNavigate } from 'react-router-dom';
import PlaceData from '../../PlaceData';
import './place.css';
import { useState } from 'react';
function Place({iconId, setIconId}) {
  const navigate = useNavigate();
  const data = PlaceData;
  const changeColor = (id) => {

    if(iconId.includes(id)) {
      let _iconId = [...iconId]
      let index = _iconId.findIndex((data) => data === id)
      _iconId.splice(index, 1)
      setIconId(_iconId)
    } else
      setIconId([...iconId, id])
  };

  return(
    <div className="place" >
      {
      
        data.map((data, i) => {
          const imp = data.id;
          
          return(
            <>
            <div className="inPlace" key={i} onClick={() => {
              navigate('/detail/' + imp);
            }}>
              <img src= {`../../public/MainImage/${data.title}.jpg`} alt=""/>
              <h3>{data.title}</h3>
              <p>
              {
                i < 6 ? 'best!' : ''
              }
              <div className='star'>
              <i class="fa-regular fa-star" onClick={(e) => {
                e.stopPropagation();
                changeColor(imp);
                }} style={{color: iconId.includes(imp) ? 'yellow' : '#171616' }}></i>
              </div>
              </p>
            </div>
            </>
          )
        })
      }
    </div>
  )
}

export default Place;