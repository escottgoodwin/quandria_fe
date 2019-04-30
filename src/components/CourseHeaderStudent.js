import React from 'react';
import '../css/App.css';

import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const CourseHeaderStudent = (props) =>

  <div style={{padding:'20px'}}>

    <h2>{props.name} - {props.courseNumber}</h2>

    <h5>Time: {props.time}</h5>

   <div style={{display:'inline-block',padding:5}}>

        <Button color="blue" >Edit Course</Button>

    </div>

  </div>


export default CourseHeaderStudent
