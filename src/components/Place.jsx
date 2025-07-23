import { useNavigate } from "react-router-dom";
import data from "../../PlaceData";
function Place(data) {
  const navigate = useNavigate();
  
  return(
    <div className="place">
      <img src= {`../../public/MainImage/${data.title}.jpg`} alt="" width='40%'/>
      <h3>1</h3>
    </div>
  )
}

export default Place;