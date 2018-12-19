import React from 'react';
import '../css/App.css';
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'

const ChallengeHeader = (props) =>

  <div>
  <h3>Challenges</h3>
  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: props.course.id }
    }} >

  <h4>{props.course.name} - {props.course.courseNumber}</h4></Link>


  <Link  to={{
    pathname: "/test_dashboard",
    state:
      { test_id: props.id }
    }} >

  <h4>{props.testNumber} - {props.subject} - { dateFormat(props.testDate, "dddd, mmmm dS, yyyy") }</h4></Link>
  </div>


export default ChallengeHeader
