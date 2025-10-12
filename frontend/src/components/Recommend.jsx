import { useState } from "react"

const Recommend = () => {
  const [data, setData] = useState({
    인내심:0,
    체력:0,
    수면욕:0,
    시간:0,
    돈:0
  })

  const [trip, setTrip] = useState(null)

  const onChangehandler = (e) => {
    setData({
      ...data,
      [e.target.name] : Number(e.target.value)
    })
  }

  const onSubmit = async (e) => {
    e.preventDafault();
    const response = await fetch(`http://localhost:5000/api/recommend`, {
      method:'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    })
    const data = await response.json()
    alert(data.message)
    if(data.ok) {
      setTrip(data.top3)
    }
  }
  return (
    <>
    <h2> 나에게 맞는 여행지 추천</h2>
      {
        trip && (
          <>
            <h4>추천 여행지 TOP 3</h4>
            {
              trip.map((trip, i) => {
                return (
                  <p key={i}> {trip.label} </p>
                )
              })
            }
          </>
        )
      }
      <form onSubmit={onSubmit}>
        <div>
          <fieldset>
            <legend>인내심</legend>
            <label>
              <input type="radio" name="인내심" value='1'onChange={onChangehandler}/>1
            </label>
            <label>
              <input type="radio" name="인내심" value='2'onChange={onChangehandler}/>2
            </label>
            <label>
              <input type="radio" name="인내심" value='3'onChange={onChangehandler}/>3
            </label>
            <label>
              <input type="radio" name="인내심" value='4'onChange={onChangehandler}/>4
            </label>
            <label>
              <input type="radio" name="인내심" value='5'onChange={onChangehandler}/>5
            </label>
        </fieldset>
          
          <fieldset>
            <legend>체력</legend>
            <label>
              <input type="radio" name="체력" value='1'onChange={onChangehandler}/>1
            </label>
            <label>
              <input type="radio" name="체력" value='2'onChange={onChangehandler}/>2
            </label>
            <label>
              <input type="radio" name="체력" value='3'onChange={onChangehandler}/>3
            </label>
            <label>
              <input type="radio" name="체력" value='4'onChange={onChangehandler}/>4
            </label>
            <label>
              <input type="radio" name="체력" value='5'onChange={onChangehandler}/>5
            </label>
        </fieldset>
        <fieldset>
            <legend>수면욕</legend>
            <label>
              <input type="radio" name="수면욕" value='1'onChange={onChangehandler}/>1
            </label>
            <label>
              <input type="radio" name="수면욕" value='2'onChange={onChangehandler}/>2
            </label>
            <label>
              <input type="radio" name="수면욕" value='3'onChange={onChangehandler}/>3
            </label>
            <label>
              <input type="radio" name="수면욕" value='4'onChange={onChangehandler}/>4
            </label>
            <label>
              <input type="radio" name="수면욕" value='5'onChange={onChangehandler}/>5
            </label>
        </fieldset>
        <fieldset>
            <legend>시간</legend>
            <label>
              <input type="radio" name="시간" value='1'onChange={onChangehandler}/>1
            </label>
            <label>
              <input type="radio" name="시간" value='2'onChange={onChangehandler}/>2
            </label>
            <label>
              <input type="radio" name="시간" value='3'onChange={onChangehandler}/>3
            </label>
            <label>
              <input type="radio" name="시간" value='4'onChange={onChangehandler}/>4
            </label>
            <label>
              <input type="radio" name="시간" value='5'onChange={onChangehandler}/>5
            </label>
        </fieldset>
        <fieldset>
            <legend>돈</legend>
            <label>
              <input type="radio" name="돈" value='1'onChange={onChangehandler}/>1
            </label>
            <label>
              <input type="radio" name="돈" value='2'onChange={onChangehandler}/>2
            </label>
            <label>
              <input type="radio" name="돈" value='3'onChange={onChangehandler}/>3
            </label>
            <label>
              <input type="radio" name="돈" value='4'onChange={onChangehandler}/>4
            </label>
            <label>
              <input type="radio" name="돈" value='5'onChange={onChangehandler}/>5
            </label>
        </fieldset>
        </div>
        <button type="sumbit">추천하기</button>
      </form>
    </>
  )
}

export default Recommend;