import { useNavigate } from 'react-router-dom';
import PlaceData from '../../PlaceData';
import './place.css';
import { useState } from 'react';
function Place() {
  const navigate = useNavigate();
  const data = PlaceData;
  const [iconColor, setIconColor] = useState('#171616');
  const changeColor = (id) => {
      setIconColor(id)
  };

  return(
    <div className="place" >
      {
      
        data.map((data, i) => {
          const imp = data.id;
          
          return(
            <>
            <div className="inPlace" key={i} >
              <img src= {`../../public/MainImage/${data.title}.jpg`} alt=""/>
              <h3>{data.title}</h3>
              <p>
              {
                i < 6 ? 'best!' : ''
              }
              <div className='star'>
              <i class="fa-regular fa-star" onClick={() => changeColor(imp)} style={{color: iconColor === imp ? 'yellow' : '#171616' }}></i>
              </div>
              </p>
            </div>
            </>
          )
        })
              // 하나씩 색이 바뀌는건 적용 , but 여러개를 색상 변경하는건 불가능함
              // 이 부분을 고쳐야됨
      }
    </div>
  )
}

export default Place;