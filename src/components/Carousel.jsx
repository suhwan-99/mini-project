function Carousel() {
  return(

  <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" style={{width:'65%',  height: '500px', margin:'auto'}}>
    <div className="carousel-inner" >
      <div className="carousel-item active">
        <img src={`${import.meta.env.BASE_URL}MainImage/bg.jpg`} className="d-block w-100" alt="..." style={{height: '500px', objectFit: 'cover' }}/>
      </div>
      <div className="carousel-item">
        <img src={`${import.meta.env.BASE_URL}MainImage/bg2.jpg`} className="d-block w-100" alt="..." style={{height: '500px', objectFit: 'cover' }}/>
      </div>
      <div className="carousel-item">
        <img src={`${import.meta.env.BASE_URL}MainImage/bg3.jpg`} className="d-block w-100" alt="..." style={{height: '500px', objectFit: 'cover' }}/>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
      </button>
  </div>
  )
}

export default Carousel;