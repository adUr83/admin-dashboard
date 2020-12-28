import React,{ useEffect,useState ,useReducer} from 'react'
import{ Navbar,Nav ,NavDropdown,FormControl,Form,Button}from 'react-bootstrap'


export default function NavBar() {
 
 



    return (

      
        <div>
         
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="/students">Students</Nav.Link>
      <Nav.Link href="/teachers">Teachers</Nav.Link>
      <Nav.Link href="/educations">Educations</Nav.Link>
      
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
          
            
        </div>
    )
}
