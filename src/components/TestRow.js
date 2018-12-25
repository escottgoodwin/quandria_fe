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

      <div><h6>
      Questions: <Link  to={{
        pathname: "/student_performance",
        state:
          {
            test_id: props.id }
        }} >
         {props.questions.length}
      </Link>
      </h6>
      </div>

      <div>
      <h6>
        Answered: { props.questions.filter(q => q.questionAnswers.length).length  }
        </h6>
      </div>

      <div>
      <h6>
        Accuracy: { props.questions.map(q => q.questionAnswers.filter(a => a.answer.correct)).filter(qa => qa.length).length / props.questions.filter(q => q.questionAnswers.length).length > 0 ?
                    props.questions.map(q => q.questionAnswers.filter(a => a.answer.correct)).filter(qa => qa.length).length / props.questions.filter(q => q.questionAnswers.length).length *100 :
                    0
         }%
        </h6>
      </div>

      <div>
      <h6>Panels: <Link  to={{
        pathname: "/test_panels",
        state:
          {
            test_id: props.id }
        }} >
         { props.panels.length }
      </Link>
      </h6>
      </div>

    </div>
    </Card.Content>
  </Card>

export default TestRow
