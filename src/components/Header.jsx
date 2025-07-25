import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate();
  return(
      
  <Navbar bg="light" data-bs-theme="light">
    <Container>
      <Navbar.Brand onClick={() => navigate('/')}><i class="fa-solid fa-plane-departure"></i>여행 다이어리</Navbar.Brand>
      <Nav className="me-auto">
         <Nav.Link>추천 여행지</Nav.Link>
         <Nav.Link onClick={() => navigate('/favorite')}>즐겨찾기</Nav.Link>
         <Nav.Link>이름</Nav.Link>
      </Nav>
       <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"/>
            <button variant="outline-success">Search</button>
          </Form>
    </Container>
  </Navbar>
      
  )
}

export default Header;