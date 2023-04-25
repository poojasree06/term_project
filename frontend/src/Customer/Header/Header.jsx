import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link,useParams } from "react-router-dom";

function CustomerNav() {
  const {username, user_id } = useParams();
  return (
    
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">E-commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href={`/${username}/${user_id}/CustomerHome`}>Home</Nav.Link>
            <Nav.Link href={`/${username}/${user_id}/DisplayItems`}  >Products</Nav.Link>
            <Nav.Link href={`/${username}/${user_id}/MyCart`}>Cart</Nav.Link>
            <Nav.Link href={`/${username}/${user_id}/MyOrders`}>Orders</Nav.Link>
            <Nav.Link href={`/${username}/${user_id}/MyReturns`}>Returns</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#action2">Profile</Nav.Link>
          </Nav>
        <Button variant="outline-success">Sign in</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomerNav;