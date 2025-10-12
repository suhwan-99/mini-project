
import './Place.css'
import PlaceData from "../../PlaceData";

import Carousel from './Carousel';
import { useNavigate } from 'react-router-dom';


function Favorite({iconId, setIconId}) {
  const navigate = useNavigate();
  return(
    <>
      <Carousel />
      <br />
      <div className='favoriteHeader'> 
        <div>즐 겨 찾 기 한 여 행 지</div>
      </div>
      <div className='container_'>
        {
          iconId.map((list, i) => {

            return (
              <>
              <div>
                <div className="inPlace " key={i} onClick={() => {
                  navigate('/detail/' + iconId[i]);
                }}>
                  <img src= {`${import.meta.env.BASE_URL}MainImage/${PlaceData[list].title}.jpg`} alt=""/>
                  <h3>{PlaceData[list].title}</h3>
                <button className='star_' onClick={(e) => {
                     e.stopPropagation();
                    let iconId_ =[...iconId];
                    iconId_.splice(i, 1);
                    setIconId(iconId_)
                  }}>X</button>
                </div>
              </div>
            </>
            )})   
        }
      </div>
    
    </>
  )
}
export default Favorite;