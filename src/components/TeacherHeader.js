import React from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const TeacherHeader = (props) =>
  <div>
  <h3>{props.firstName} {props.lastName}'s Courses</h3>
  <Link  to="/add_course"><Button color='blue'>Add Course</Button></Link>
  </div>

export default TeacherHeader
