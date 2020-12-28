import React,{ useEffect,useState} from 'react'
import{ Table,Button , Modal ,InputGroup,Row ,Col }from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'
import "./Students.css"
import axios from 'axios'
import { Formik } from 'formik';

export default function Teachers() {
  const [teachers, setTeachers] = useState([])
  



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
      <td><Button onClick={()=>{deleteStudent(item)}} variant="danger">Delete</Button></td>
      
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
