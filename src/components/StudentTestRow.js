import React from 'react';
import '../css/App.css';

import { Button, Card,   } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
var dateFormat = require('dateformat');

const StudentTestRow = (props) =>

<Card fluid>
  <Card.Content>
  <div className="course_row">
  <div>

    <Link  to={{
      pathname: "/student_test_dashboard",
      state:
        { test_id: props.test.id }
      }} >

  <h5>{props.test.testNumber} - {props.test.subject} - { dateFormat(props.test.testDate, "dddd, mmmm dS, yyyy") }</h5>

  </Link>
  </div>
  <div>
  {props.test.published &&
    <Button basic disabled color="green" size="small">Test Published</Button>
  }

  {(props.test.release && props.test.published) &&
    <Button basic disabled color="teal" size="small">Questions Released</Button>
  }
</div>

  </div>

  <hr />

    <div className="course_row">

      <div><h6>
      Questions: <Link  to={{
        pathname: "/student_test_performance",
        state:
          {
            course_id: props.courseId,
            test_id: props.test.id }
        }} >
         {props.test.questions.length}
      </Link>
      </h6>
      </div>

      <div>
      <h6>Panels: <Link  to={{
        pathname: "/student_test_panels",
        state:
          {
            test_id: props.test.id }
        }} >
         { props.test.panels.length }
      </Link>
      </h6>
      </div>

    </div>
    </Card.Content>
  </Card>

export default StudentTestRow
