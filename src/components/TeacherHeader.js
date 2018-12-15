import React from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';

const TeacherHeader = (props) =>
  <div>
  <h2>{props.firstName} {props.lastName}'s Dashboard</h2>
  <h4>Courses</h4>
  <Link  to="/add_course"><Button color="primary" size="sm">Add Course</Button></Link>
  </div>

export default TeacherHeader
