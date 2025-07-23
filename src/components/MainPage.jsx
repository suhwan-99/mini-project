import bg from '../../public/bg.jpg'
import Place from './place';
function MainPage() {
  return(
    <>
    <div className="Main-bg" style={{backgroundImage: 'url('+ bg +')', height: '400px', backgroundSize: 'cover'}}></div>
      <br />
      <div className='container'>
        <div className='row'>
          <Place />
        </div>
      </div>
    </>
  )
}

export default MainPage;