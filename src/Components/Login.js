import React from 'react'
import{ InputGroup,Row ,Col,Button}from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Login() {
let history = useHistory();

    return (
        <Formik
       initialValues={{ userName: '', password: '' }}
      
       onSubmit={(values) => {
    
console.log(values);  // veriler valuesin icinde


axios.get('http://localhost:3000/users').then((res)=>{

let data =res.data
console.log(data);

let isFind = false
for(let i=0;i < data.length;i++) {
    if(values.userName ===data[i].userName && values.password === data[i].password){
       isFind = true
       localStorage.setItem("crntUser",JSON.stringify(data[i]));
       
       history.push("/home")
    }

}   
if( isFind === false) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'user name or password incorrect!',
       
      })
}




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
      Login Page....
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
  <Button onClick={ handleSubmit} variant="warning">Login   </Button>
  <Button className="mt-3" onClick={ ()=>{history.push("/signUp")}} variant="success">Sign Up   </Button>
  </div> 


       )}
     </Formik>
    )
}
