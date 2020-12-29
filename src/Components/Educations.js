import React,{ useEffect,useState} from 'react'
import axios from 'axios'
import{ Table,Button , Modal ,InputGroup,Row ,Col ,Alert}from 'react-bootstrap'
import { Formik } from 'formik';
import FormControl from 'react-bootstrap/FormControl'
import moment from 'moment'
import Select from 'react-select';

import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";


export default function Educations() {

const [educations, setEducations] = useState([])
const [students, setStudents] = useState([])
const [asgnModel, setAsgnModel] = useState(false)


const [currentStudent, setCurrentStudent] = useState(null)
const [updateShowModal, setUpdateShowModal] = useState(false)


const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

useEffect(() => {
  
    axios.get('http://localhost:3000/educations').then((res)=>{

        let data =res.data
        console.log(data);
        
        setEducations(data)
        
        
        
        }).catch((err)=>{console.log(err);})
    
}, [])

const assgnStudent = ()=>{
    setAsgnModel(true)

    axios.get('http://localhost:3000/students').then((res)=>{

        let data =res.data
        console.log(data);

        const temp = [];
        data.forEach(item => {
            temp.push({ value: item.id, label: item.firstName + " "  + item.lastName})
        });
        
        
        setStudents(temp)

        
        
        }).catch((err)=>{console.log(err);})




}
const updateStudent = (item)=>{
    axios.get(`http://localhost:3000/educations/${item.id}`).then((res)=>{

        let data =res.data
        console.log(data);
        
        setCurrentStudent(data)
        
        setUpdateShowModal(true)
        
        }).catch((err)=>{console.log(err);})

}


const deleteItem =(item)=>{


    axios.delete(`http://localhost:3000/educations/${item.id}`).then((res)=>{

  axios.get('http://localhost:3000/educations').then((res)=>{

    let data =res.data
    console.log(data);
    
    setEducations(data)
    
    
    
    }).catch((err)=>{console.log(err);})



}).catch((err)=>{console.log(err);})
}

const rederHtml = educations.map((item,index)=>{

return (
    <tr>
    <td>{item.name}</td>
    <td>{item.des}</td>
    <td>{moment(item.startDate).format('MMMM Do YYYY')}</td>
    <td>{moment(item.endDate).format('MMMM Do YYYY')}</td>
    <td><Button className="mr-2"  onClick={()=>deleteItem(item)} variant="danger">Delete</Button> <Button onClick={()=>assgnStudent(item)}  variant="warning">Assign Student</Button> 
    <Button className="mt-2" onClick={()=>updateStudent(item)}  variant="primary">Update</Button> 
     </td>
    
  </tr>
  
)
})
    return (
        <div>

<Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Add Education</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Formik
       initialValues={{ name: '', des: '' , startDate:'',endDate:"",}}
      
       onSubmit={(values, { setSubmitting }) => {

        axios.post('http://localhost:3000/educations',values).then((res)=>{


          axios.get('http://localhost:3000/educations').then((res)=>{

            let data =res.data
            console.log(data);
            
            setEducations(data)
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
         setFieldValue
         /* and other goodies */
       }) => (
        <div>

        



<Row>
        <Col md={12}>
<InputGroup className="mb-3">
<InputGroup.Prepend>
<InputGroup.Text id="basic-addon1"> Name</InputGroup.Text>
</InputGroup.Prepend>
<FormControl 
name="name"
value={values.name}
onChange={handleChange}


placeholder="name"
aria-label=" Name"
aria-describedby="basic-addon1"
/>
</InputGroup>
</Col>
</Row>

<Row>
        <Col md={12}>
<InputGroup className="mb-3">
<InputGroup.Prepend>
<InputGroup.Text id="basic-addon1"> Descriptions</InputGroup.Text>
</InputGroup.Prepend>
<FormControl 
name="des"
value={values.des}
onChange={handleChange}


placeholder="Descriptions"
aria-label="Descriptions"
aria-describedby="basic-addon1"
/>

</InputGroup>
</Col>
</Row>

<Row>
        <Col md={12}>
           <label>Start Date</label>
           <br></br>

        <DatePicker selected={values.startDate} placeholderText="Start date"  name="startDate" onChange={date => setFieldValue("startDate",date) } />
</Col>
</Row>



<Row>
        <Col md={12}>
        <label>End Date</label>
           <br></br>
        <DatePicker  selected={values.endDate}  placeholderText="End date" name="endDate" onChange={date =>  setFieldValue("endDate",date)} />
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







      {/* Assaing Student */}







      <Modal show={asgnModel} onHide={()=>{setAsgnModel(false)}}>
       
          

          <div>

<Modal.Header >
          <Modal.Title>Assing Student </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Formik
       initialValues={{ }}
      
       onSubmit={(values, { setSubmitting }) => {


        



          
  
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
        <Select
   
    isMulti
    name="colors"
    options={students}
    className="basic-multi-select"
    classNamePrefix="select"
  />
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

          
        
      </Modal>




{/* update educations */}






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
    //    validationSchema={studentValideteShema}
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

      <Button onClick={handleShow} className="mb-3" variant="primary">Add Education  </Button>
            <Table striped bordered hover responsive>
  <thead>
    <tr>
      <th>Education Name</th>
      <th>Description</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {rederHtml}
  </tbody>
</Table>
        </div>
    )
}
