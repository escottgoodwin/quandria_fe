import React from 'react';
import '../css/App.css';

import { Link } from 'react-router-dom'

const EditTestHeader = (props) =>

  <div>

  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: props.location.state.course_id }
    }} >


  <h4>{props.course.name} - {props.course.school_id}</h4>

  </Link>

  <Link  to={{
    pathname: "/test_dashboard",
    state:
      { test_id: props.location.state.test_id,
      course_id: props.location.state.course_id }
    }} >

  <h4>{props.test.test.test_number} - {props.test.test.Subjects}</h4>

  </Link>


  </div>


export default EditTestHeader
