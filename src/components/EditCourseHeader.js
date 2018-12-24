import React from 'react';
import '../css/App.css';

import { Link } from 'react-router-dom'

const EditCourseHeader = (props) =>

  <div>
  <div style={{padding:'10px'}}>

  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: props.id }
    }} >

  <h2>{props.name} - {props.courseNumber}</h2>

  </Link>

  </div>

  </div>



export default EditCourseHeader
