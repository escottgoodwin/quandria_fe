import React from 'react';
import '../css/App.css';
import { Card, CardText} from 'reactstrap';
import {Link} from 'react-router-dom'

const CourseRow = (props) =>

<Card key={props.id} className="card" body>

  <CardText>
  <div className="course_row">

  <div>
  <h5>
  {props.institution.name}
  </h5>
  </div>

  <div>
  <h5>
  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: props.id }
    }} >

  {props.name}</Link>
  </h5>
  </div>

  <div>
  <h5>
  {props.time}
  </h5>
  </div>

  <div>
  <h5>
  Tests: {props.tests.length}
  </h5>
  </div>

  <div>
  <h5>
  Students: {props.students.length}
  </h5>
  </div>

  </div>

  </CardText>

</Card>

export default CourseRow
