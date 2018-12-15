import React from 'react';
import '../css/App.css';

import { Link } from 'react-router-dom'

const AddTestHeader = (props) =>

  <div>

  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: props.location.state.course_id }
    }} >

  <h4>{props.course.name} - {props.course.school_id}</h4></Link>
  <h5>Time: {props.course.time}</h5>
  </div>


export default AddTestHeader
