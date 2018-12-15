import React from 'react';
import '../css/App.css';

import { Link } from 'react-router-dom'

const EditCourseHeader = (props) =>

  <div>
  <div>

  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: props.location.state.course_id }
    }} >

  <h4>{props.course.sel_course.name} - {props.course.sel_course.school_id}</h4>

  </Link>

  <h5>Time: {props.course.sel_course.time}</h5>

  </div>

  </div>



export default EditCourseHeader
