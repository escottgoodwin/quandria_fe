import React from 'react';
import '../css/App.css';

import { Link } from 'react-router-dom'

const EditTestHeader = (props) =>

  <div>

  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: props.course.id }
    }} >


  <h4>{props.course.name} - {props.course.courseNumber}</h4>

  </Link>

  <Link  to={{
    pathname: "/test_dashboard",
    state:
      { test_id: props.id,
      course_id: props.course.id }
    }} >

  <h4>{props.testNumber} - {props.subject}</h4>

  </Link>


  </div>


export default EditTestHeader
