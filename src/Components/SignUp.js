
import React from 'react'
import{ InputGroup,Row ,Col,Button}from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function SignUp() {
let history = useHistory();

    return (
        <Formik
       initialValues={{ userName: '', password: '',firstName:'',lastName:'',email:'' }}
      
       onSubmit={(values) => {
    
console.log(values);  // veriler valuesin icinde

values.id= 3
axios.post('http://localhost:3000/users',values).then((res)=>{






}).catch((err)=>{console.log(err);})



       }}


     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
        
       }) => (
        
     <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',flexDirection:"column"}}>
      Sign Up Page...
           <Row>
               <Col md={12} className="mt-3">
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
    name="userName"
    value={values.userName}
    onChange={handleChange}

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
    name="password"
    value={values.password}
onChange={handleChange}

    type="password"
      placeholder="Password"
      aria-label="Password"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
  </Col>
  </Row>

  <Row>
               <Col md={12}>
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1"> First Name</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl 
    name="firstName"
    value={values.firstName}
onChange={handleChange}


      placeholder="First name"
      aria-label="First name"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
  </Col>
  </Row>

  <Row>
               <Col md={12}>
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1"> Last Name</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl 
    name="lastName"
    value={values.lastName}
onChange={handleChange}


      placeholder="Last name"
      aria-label="Last name"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
  </Col>
  </Row>


  <Row>
               <Col md={12}>
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1"> E-mail</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl 
    name="email"
    value={values.email}
onChange={handleChange}

type="email"
      placeholder="e-mail"
      aria-label="e-mail"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
  </Col>
  </Row>
  <Button onClick={ handleSubmit} variant="warning">Sign Up   </Button>
  <Button className="mt-3" onClick={ ()=>{history.push("/login")}} variant="success"> Login  </Button>
  </div> 


       )}
     </Formik>
    )
}
