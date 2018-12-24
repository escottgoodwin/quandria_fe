import React from 'react';
import '../css/App.css';

import { Button, Card,   } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
var dateFormat = require('dateformat');

const TestRow = (props) =>

<Card fluid>
  <Card.Content>
  <div className="course_row">
  <div>

    <Link  to={{
      pathname: "/test_dashboard",
      state:
        { test_id: props.id }
      }} >

  <h5>{props.testNumber} - {props.subject} - { dateFormat(props.testDate, "dddd, mmmm dS, yyyy") }</h5>

  </Link>
  </div>
  <div>
  {props.release &&
    <Button basic disabled color="green" size="small">Test Published</Button>
  }

    {props.release &&
      <Button basic disabled color="teal" size="small">Questions Released</Button>
    }
</div>

  </div>

  <hr />

    <div className="course_row">

      <div>
        Questions: {props.questions.length}
      </div>

      <div>
        Answered: 3
      </div>

      <div>
        Accuracy: 45%
      </div>

      <div>
        Panels: { props.panels.length }
      </div>

    </div>
    </Card.Content>
  </Card>

export default TestRow
