import { useParams } from "react-router-dom";
import PlaceData from "../../PlaceData";
import './Place.css';
import { useEffect, useState } from "react";

function Detail({iconId, userInfo}) {
  const {id} = useParams();
  const data = PlaceData;
  const [posts, setPosts] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/review/${id}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((e) => console.error(e));
  }, [id]);

 const addPost = async () => {
    if (!inputText.trim()) return;
    if (!userInfo) {
      alert('로그인 후 리뷰를 작성할 수 있습니다.');
      return;
    }

    const resposne = await fetch(`http://localhost:5000/review/${id}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      credentials: 'include',
      body: JSON.stringify({ content: inputText }),
    });

    const data = await resposne.json();
    alert(data.message);

    if (data.ok) {
      setPosts([
        data.review, 
        ...posts
      ]);
      setInputText('');
    }
  };

  const removePost = async (reviewId) => {
    const res = await fetch(`http://localhost:5000/review/${reviewId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const data = await res.json();
    alert(data.message);

    if (data.ok) {
      setPosts(posts.filter((p) => p.id !== reviewId));
    }
  };

  return(
    <div>
      <div className="inPlace" style={{margin: '1rem 0px 0px 3rem'}}>
        <img src={`${import.meta.env.BASE_URL}MainImage/${data[id].title}.jpg`} alt="" />
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
             <textarea
                value={inputText}
                style={{ height: '300px', width: '100%', fontSize: '2rem' }}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                style={{ marginLeft: '10px', width: '60px', height: '50px' }}
                onClick={addPost}
              >
                작성
              </button>

          </div>
          <div className="reviewContent">
                <ul>
                  {posts.map((post) => (
                    <li key={post.id} style={{ marginBottom: '1rem', borderBottom: '1px solid gray' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{post.author.nickname}</strong>
                        <span>{post.created_at}</span>
                      </div>
                      <div style={{ fontSize: '1.2rem', marginTop: '5px' }}>{post.content}</div>
                      {userInfo && userInfo.id === post.author.id && (
                        <button
                          style={{ border: '1px solid white', width: '30px', height: '30px' }}
                          onClick={() => removePost(post.id)}
                        >
                          X
                        </button>
                      )}
                    </li>
                  ))}
                </ul>                
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail;