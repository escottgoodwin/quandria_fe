import React from 'react';
import '../css/App.css';
import { Card, Button, CardTitle, CardText} from 'reactstrap';
import {Link} from 'react-router-dom'
var dateFormat = require('dateformat');

const TestRow = (props) =>

<Card className="card" body>

  <div className="course_row">

    <Link  to={{
      pathname: "/test_dashboard",
      state:
        { test_id: props.id }
      }} >

  <CardTitle>{props.testNumber} - {props.subject} - {  dateFormat(props.testDate, "dddd, mmmm dS, yyyy") }</CardTitle>

  </Link>

    {props.release &&
      <Button outline disabled color="success" size="sm">Questions Released</Button>
    }


  </div>

  <hr />

  <CardText>

    <div className="course_row">

      <div>
        Total: {props.questions.length}
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

    </CardText>

  </Card>

export default TestRow
