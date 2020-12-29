import React,{ useEffect,useState} from 'react'
import{ Table,Button , Modal ,InputGroup,Row ,Col ,Alert}from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'
import "./Students.css"
import axios from 'axios'
import { Formik } from 'formik';
import * as Yup from "yup";


const teacherValideteShema =Yup.object({
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





export default function Teachers() {
  const [teachers, setTeachers] = useState([])
  
  const [currentTeacher, setCurrentTeacher] = useState(null)
  const [updateShowModal, setUpdateShowModal] = useState(false)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


useEffect(() => {
 

  axios.get('http://localhost:3000/teachers').then((res)=>{

    let data =res.data
    console.log(data);
    
    setTeachers(data)
    
    
    
    }).catch((err)=>{console.log(err);})

}, [])

const updateTeacher =(item)=>{
    axios.get(`http://localhost:3000/teachers/${item.id}`).then((res)=>{

    let data =res.data
    console.log(data);
    
    setCurrentTeacher(data)
    
    setUpdateShowModal(true)
    
    }).catch((err)=>{console.log(err);})
}

const deleteStudent =(item)=>{


axios.delete(`http://localhost:3000/teachers/${item.id}`).then((res)=>{

  axios.get('http://localhost:3000/teachers').then((res)=>{

    let data =res.data
    console.log(data);
    
    setTeachers(data)
    
    
    
    }).catch((err)=>{console.log(err);})



}).catch((err)=>{console.log(err);})



}

const renderHtml = teachers.map((item,index)=>{
  return(
    <tr>
      <td>{item.id}</td>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.age}</td>
      <td><Button onClick={()=>{deleteStudent(item)}} variant="danger">Delete</Button>
      <Button onClick={()=>{updateTeacher(item)}} variant="warning">Update</Button>
      </td>
      
    </tr>
  )
})
    return (
        <div>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Add Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Formik
       initialValues={{ firstName: '', lastName: '' , age:'',id:"",}}
       validationSchema={teacherValideteShema}
       onSubmit={(values, { setSubmitting }) => {

        axios.post('http://localhost:3000/teachers',values).then((res)=>{


          axios.get('http://localhost:3000/teachers').then((res)=>{

            let data =res.data
            console.log(data);
            
            setTeachers(data)
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

<Row>
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



      {/* uptade teacher  */}




      <Modal show={updateShowModal} onHide={()=>{setUpdateShowModal(false)}}>
        {

          currentTeacher !== null && 
          

          <div>

<Modal.Header >
          <Modal.Title>Update Student : {currentTeacher.firstName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Formik
       initialValues={{ firstName: currentTeacher.firstName, lastName: currentTeacher.lastName , age:currentTeacher.age}}
       validationSchema={teacherValideteShema}
       onSubmit={(values, { setSubmitting }) => {


        console.log(values);

        axios.put(`http://localhost:3000/students/${currentTeacher.id}`,values).then((res)=>{


          axios.get('http://localhost:3000/students').then((res)=>{

            let data =res.data
            console.log(data);
            
            setTeachers(data)
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



           <Button onClick={handleShow} className="mb-3" variant="primary">Add Teachers  </Button>
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
