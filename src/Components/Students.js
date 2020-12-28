import React,{ useEffect,useState} from 'react'
import{ Table,Button , Modal ,InputGroup,Row ,Col,Alert }from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'
import "./Students.css"
import axios from 'axios'
import { Formik } from 'formik';



import * as Yup from "yup";


const studentValideteShema =Yup.object({
  firstName: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(15, "Maximum 15 characters ")
    .required("Required!"),
    lastName: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(15, "Maximum 15 characters ")
    .required("Required!"),
    age: Yup.number()
    .min(18, "Age has to be over 18")
    .max(50, "Age has to be max 50")
    .required("Required!"),
  // email: Yup.string()
  //   .email("Invalid email format")
  //   .required("Required!"),
  
})



export default function Students() {
  const [students, setStudents] = useState([])


  
  const [updateShowModal, setUpdateShowModal] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(null)


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


useEffect(() => {
 

  axios.get('http://localhost:3000/students').then((res)=>{

    let data =res.data
    console.log(data);
    
    setStudents(data)
    
    
    
    }).catch((err)=>{console.log(err);})

}, [])

const updateStudent =(item)=>{
  axios.get(`http://localhost:3000/students/${item.id}`).then((res)=>{

    let data =res.data
    console.log(data);
    
    setCurrentStudent(data)
    
    setUpdateShowModal(true)
    
    }).catch((err)=>{console.log(err);})





}


const deleteStudent =(item)=>{


axios.delete(`http://localhost:3000/students/${item.id}`).then((res)=>{

  axios.get('http://localhost:3000/students').then((res)=>{

    let data =res.data
    console.log(data);
    
    setStudents(data)
    
    
    
    }).catch((err)=>{console.log(err);})



}).catch((err)=>{console.log(err);})



}

const renderHtml = students.map((item,index)=>{
  return(
    <tr>
      <td>{item.id}</td>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.age}</td>
      <td><Button className="mr-3" onClick={()=>{deleteStudent(item)}} variant="danger">Delete</Button> 
      <Button onClick={()=>{updateStudent(item)}} variant="warning">Update</Button>
      </td>

      
    </tr>
  )
})
    return (
        <div>


{/* Add student Model */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Add Students</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Formik
       initialValues={{ firstName: '', lastName: '' , age:'',}}
       validationSchema={studentValideteShema}
       onSubmit={(values, { setSubmitting }) => {

        axios.post('http://localhost:3000/students',values).then((res)=>{


          axios.get('http://localhost:3000/students').then((res)=>{

            let data =res.data
            console.log(data);
            
            setStudents(data)
            setShow(false)
            setSubmitting(false)
            
            }).catch((err)=>{console.log(err);})



          
        })
         console.log(values);

        
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
         /* and other goodies */
       }) => (
        <div>

{/* <Row>
        <Col md={12}>
<InputGroup className="mb-3">
<InputGroup.Prepend>
<InputGroup.Text id="basic-addon1"> ID</InputGroup.Text>
</InputGroup.Prepend>
<FormControl 
name="id"
value={values.id}
onChange={handleChange}

type="number"
placeholder="id number"
aria-label="id number"
aria-describedby="basic-addon1"
/>
</InputGroup>
</Col>
</Row>
         */}



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


{errors.firstName && touched.firstName && (

<Alert  variant="danger">
{errors.firstName}
</Alert>
            
    )}



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
{errors.lastName && touched.lastName && (

<Alert  variant="danger">
{errors.lastName}
</Alert>
            
    )}
</Col>
</Row>

<Row>
        <Col md={12}>
<InputGroup className="mb-3">
<InputGroup.Prepend>
<InputGroup.Text id="basic-addon1">Age</InputGroup.Text>
</InputGroup.Prepend>
<FormControl 
name="age"
value={values.age}
onChange={handleChange}

type="number"
placeholder="age"
aria-label="age"
aria-describedby="basic-addon1"
/>
</InputGroup>
{errors.age && touched.age && (

<Alert  variant="danger">
{errors.age}
</Alert>
            
    )}
</Col>
</Row>

          
           <Button onClick={handleSubmit} type="button" disabled={isSubmitting}>
             Save
           </Button>
           </div>
       )}
     </Formik>

        </Modal.Body>
       
      </Modal>















{/* Update Model */}
      <Modal show={updateShowModal} onHide={()=>{setUpdateShowModal(false)}}>
        {

          currentStudent !== null && 
          

          <div>

<Modal.Header >
          <Modal.Title>Update Student : {currentStudent.firstName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Formik
       initialValues={{ firstName: currentStudent.firstName, lastName: currentStudent.lastName , age:currentStudent.age,}}
       validationSchema={studentValideteShema}
       onSubmit={(values, { setSubmitting }) => {


        console.log(values);

        axios.put(`http://localhost:3000/students/${currentStudent.id}`,values).then((res)=>{


          axios.get('http://localhost:3000/students').then((res)=>{

            let data =res.data
            console.log(data);
            
            setStudents(data)
            setUpdateShowModal(false)
           
            setSubmitting(false)
            
            }).catch((err)=>{console.log(err);})



          
        })
         console.log(values);

        
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
         /* and other goodies */
       }) => (
        <div>

{/* <Row>
        <Col md={12}>
<InputGroup className="mb-3">
<InputGroup.Prepend>
<InputGroup.Text id="basic-addon1"> ID</InputGroup.Text>
</InputGroup.Prepend>
<FormControl 
name="id"
value={values.id}
onChange={handleChange}

type="number"
placeholder="id number"
aria-label="id number"
aria-describedby="basic-addon1"
/>
</InputGroup>
</Col>
</Row>
         */}



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


{errors.firstName && touched.firstName && (

<Alert  variant="danger">
{errors.firstName}
</Alert>
            
    )}



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
{errors.lastName && touched.lastName && (

<Alert  variant="danger">
{errors.lastName}
</Alert>
            
    )}
</Col>
</Row>

<Row>
        <Col md={12}>
<InputGroup className="mb-3">
<InputGroup.Prepend>
<InputGroup.Text id="basic-addon1">Age</InputGroup.Text>
</InputGroup.Prepend>
<FormControl 
name="age"
value={values.age}
onChange={handleChange}

type="number"
placeholder="age"
aria-label="age"
aria-describedby="basic-addon1"
/>
</InputGroup>
{errors.age && touched.age && (

<Alert  variant="danger">
{errors.age}
</Alert>
            
    )}
</Col>
</Row>

          
           <Button onClick={handleSubmit} type="button" disabled={isSubmitting}>
             Save
           </Button>
           </div>
       )}
     </Formik>

        </Modal.Body>
       
            
          </div>

          
        }
      </Modal>







           <Button onClick={handleShow} className="mb-3" variant="primary">Add Student  </Button>
            <Table striped bordered hover responsive>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Age</th>
      <th>Actions</th>

    </tr>
  </thead>
  <tbody>
    {renderHtml}
  </tbody>
</Table>
        </div>
    )
}
