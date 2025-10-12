import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
function Header({ userInfo, setUserInfo }) {
  const navigate = useNavigate();
  return(
      
  <Navbar bg="light" data-bs-theme="light" style={{fontSize:'1.25rem'}}>
    <Container>
      <Navbar.Brand onClick={() => navigate('/')} style={{fontSize:'1.25rem'}}><i className="fa-solid fa-plane-departure"></i>여행 다이어리</Navbar.Brand>
      <Nav className="me-auto">
         
         <Nav.Link onClick={() => navigate('/favorite')}>즐겨찾기</Nav.Link>
         <Nav.Link onClick={() => navigate('/recommend')}> 여행지 추천 받기</Nav.Link>
         {
           userInfo ? (
            <>
              <Nav.Link onClick={() => navigate('/mypage')}>마이페이지</Nav.Link>
              <Nav.Link onClick={() => {
                fetch('http://localhost:5000/user/logout', {
                  method:'POST',
                  credentials: 'include'
                }).then(response => response.json())
                .then(data => {
                  alert(data.message)
                  setUserInfo(null)
                }).catch(e => {
                  console.log(e)
                })
              }}>로그아웃</Nav.Link>
              { userInfo && <h4> {userInfo.nickname} 님</h4> }
            </>
          )
          
          : (
            <>
              <Nav.Link onClick={() => navigate('/signup')}>회원가입</Nav.Link>
              <Nav.Link onClick={() => navigate('/login')}>로그인</Nav.Link>
            </>
            )}
      </Nav>
    </Container>
  </Navbar>
      
  )
}

export default Header;