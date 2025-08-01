import { useParams } from "react-router-dom";
import PlaceData from "../../PlaceData";
import './Place.css';
import { useEffect, useState } from "react";
function Detail({iconId}) {
  const {id} = useParams();
  const data = PlaceData;
  const [posts, setPosts] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const savePosts = localStorage.getItem('posts');
    setPosts(JSON.parse(savePosts));
  },[]);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (() => {
    if(inputText.trim() === '') return;
    const now = new Date();
    const formattedDate = now.toLocaleString();
    const newPost = {
      id: Date.now(),
      text: inputText,
      date: formattedDate,
    };

    setPosts([newPost, ...posts]);
    setInputText('');
  });
  
  const removePost = ((id) => {
    setPosts(posts.filter(post => post.id !== id));
  });

  return(
    <div>
      <div className="inPlace" style={{margin: '1rem 0px 0px 3rem'}}>
        <img src={`../../public/MainImage/${data[id].title}.jpg`} alt="" />
        <h3>{data[id].title}</h3>
      </div>
      <div className="contentbox">
          
            <div className="contentBody">
              <h1 style={{fontSize:'4.5rem', fontWeight:'bold'}}>{data[id].title}</h1>
              <h1>맛집</h1>
              <br />
              <div className="detailContent" style={{width: '90%', justifyContent:'center', alignItems:'center'}}>
                {data[id].contents.map((contents, i) => {
                  return (
                    
                    <div className="imgContent" key={i} style={{display:'flex'}}>
                      <img src={contents.image} alt=""/>
                      <div style={{width:'68%', backgroundColor:'rgb(248, 248, 239)', borderRadius:'5px', border:'1px solid darkgray'}}>{contents.content}</div>
                    </div>
                    
                  )
                })}
              </div>
              <div>
                <h1>여행지</h1>
                <br />
                <div className="detailContent" style={{width:'90%'}}>
                  {data[id].hotPlace.map((hotPlace, i) => {
                    return (
                      
                      <div className="imgContent" key={i} style={{display:'flex'}}>
                        <img src={hotPlace.image} alt=""/>
                        <div style={{width:'68%', backgroundColor:'rgb(248, 248, 239)', borderRadius:'5px', border:'1px solid darkgray'}}>{hotPlace.content}</div>
                      </div>
                      
                    )
                  })}
                </div>
              </div>
            </div>
      </div>
      <div style={{justifyContent:'center', display:'flex', paddingBottom:'200px'}}>
        <div className="review">
          <h2>Review</h2>
          <div>
            <textarea type="" value={inputText} style={{height:'300px', width:'100%',fontSize:'2rem'}} onChange={(e) => {
              setInputText(e.target.value)}} />
            <button style={{marginLeft:'10px', width:'60px', height:'50px'}} onClick={addPost}>작성</button>
          </div>
          <div className="reviewContent">
            <ul>
              {posts.map((post, i) => {
                return (
                <li key={post.id} style={{}}>
                  <div style={{display:'flex', fontSize:'20px'}}><strong>{post.text}</strong></div>
                  <div style={{display:'flex',textAlign:'right'}}>{post.date}</div>
                  <button style={{border: '1px solid white', width:'30px', height:'30px'}} onClick={() => {
                    removePost(post.id);
                  }}>X</button>
                </li>
                )
              })}  
            </ul>                
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail;