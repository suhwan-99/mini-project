import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate();
  return(
      
  <Navbar bg="light" data-bs-theme="light" style={{fontSize:'1.25rem'}}>
    <Container>
      <Navbar.Brand onClick={() => navigate('/')} style={{fontSize:'1.25rem'}}><i class="fa-solid fa-plane-departure"></i>여행 다이어리</Navbar.Brand>
      <Nav className="me-auto">
         
         <Nav.Link onClick={() => navigate('/favorite')}>즐겨찾기</Nav.Link>
         <Nav.Link onClick={() => navigate('/login')}>회원가입</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
      
  )
}

export default Header;