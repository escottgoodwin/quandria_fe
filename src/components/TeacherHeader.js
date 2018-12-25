import React from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const TeacherHeader = (props) =>
  <div>
  <h3>{props.firstName} {props.lastName}'s Courses</h3>
  <div style={{padding:"15px"}}>
  <Link  to="/add_course"><Button color='blue'>Add Course</Button></Link>
  </div>
  </div>

export default TeacherHeader
