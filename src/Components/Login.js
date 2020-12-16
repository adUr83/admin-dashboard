import React from 'react'
import{ InputGroup,Row ,Col}from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'



export default function Login() {
    return (
     <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',flexDirection:"column"}}>
      
           <Row>
               <Col md={12} className="mt-3">
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Username"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
  </Col>
  </Row>

  <Row>
               <Col md={12}>
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl 
    type="password"
      placeholder="Password"
      aria-label="Password"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
  </Col>
  </Row>

  </div> 
    )
}
