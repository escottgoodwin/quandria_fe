import React from 'react';
import dateFormat from 'dateformat'
import '../css/App.css';


import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';

const TestHeader = (props) =>

  <div>
  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: props.course.id }
    }} >
  <h2>{props.course.name} - {props.course.courseNumber}</h2></Link>

  <div >
  <h3>{props.testNumber} - {props.subject} - { dateFormat(props.testDate, "dddd, mmmm dS, yyyy") }</h3>
  </div>

  <div style={{display:'inline-block',padding:5}}>
<Link to={{
  pathname: "/edit_test",
  state:
    {
      test_id: props.id,
    }
  }} >

<Button color="primary" size="sm">Edit</Button>

</Link>
</div>

<div style={{display:'inline-block',padding:5}}>
<Button  color="danger" size="sm">Delete</Button>
</div>

<div style={{padding:5}}>
{props.release ?
  <Button disabled onClick={props.release_questions} color="primary" size="sm">All Questions Released</Button>
:
  <Button onClick={props.release_questions} color="primary" size="sm">Release All Questions</Button>
}
</div>

<div>
  <h6 style={{color:'green',padding:5,height:10}}>message</h6>
</div>
</div>

export default TestHeader
