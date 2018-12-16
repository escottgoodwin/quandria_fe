import React from 'react';
import '../css/App.css';

import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';

const CourseHeader = (props) =>

  <div>
    <h2>{props.name} - {props.courseNumber}</h2>

    <h5>Time: {props.time}</h5>

   <div style={{display:'inline-block',padding:5}}>
     <Link  to={{
       pathname: "/edit_course",
       state:
         { course_id: props.id }
       }} >
        <Button color="primary" size="sm">Edit Course</Button>
       </Link>
    </div>

   <div style={{display:'inline-block',padding:5}}>
    <Button  color="danger" size="sm">Delete Course</Button>
   </div>

   <div style={{display:'inline-block',padding:5}}>
     <Link  to={{
       pathname: "/add_test",
       state:
         { course_id: props.id }
       }} >
       <Button color="primary" size="sm">Add Test</Button>
      </Link>
    </div>

  </div>


export default CourseHeader