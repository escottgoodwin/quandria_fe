import React from 'react';
import '../css/App.css';
import { Card, CardTitle, CardText} from 'reactstrap';
import {Link} from 'react-router-dom'

const CourseRow = (props) =>

<Card key={props.id} className="card" body>

  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: props.id }
    }} >

  <CardTitle>{props.name} - {props.institution.name} ({props.time})</CardTitle></Link>

  <CardText>
  <div className="course_row">

  <div>
  Tests: {props.tests.length}
  </div>

  <div>
  Students: {props.students.length}
  </div>

  </div>

  </CardText>

</Card>

export default CourseRow
