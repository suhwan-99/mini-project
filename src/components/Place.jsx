import { useNavigate } from 'react-router-dom';
import PlaceData from '../../PlaceData';
import './Place.css';
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
              <img src= {`${import.meta.env.BASE_URL}MainImage/${data.title}.jpg`} alt=""/>
              <h3>{data.title}</h3>
              <p className='best'>
              {
                i < 3 ? 'best!' : ''
              }
              <div className='star' onClick={(e) => {
                e.stopPropagation();
                changeColor(imp);
              }}>
              <i class="fa-regular fa-star"style={{color: iconId.includes(imp) ? 'yellow' : '#171616' }}></i>
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