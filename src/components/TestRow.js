import React,{Component} from 'react';
import '../css/App.css';
import { Button, Card } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import PanelCountRow from './PanelCountRow'
import QuestionCountRow from './QuestionCountRow'
import AnswerCountRow from './AnswerCountRow'
import ChallengeCountRow from './ChallengeCountRow'

var dateFormat = require('dateformat')

export default class TestRow extends Component {

  render() {
    const { id, testNumber, subject, testDate, published, publishDate, release, releaseDate, questionsCount, panelsCount, answersCount, accuracy, challengeCount } = this.props.test
    return (

      <Card fluid>
        <Card.Content>
        <div className="course_row">
        <div>

          <Link  to={{
            pathname: "/test_dashboard",
            state:
              { test_id: id }
            }} >

        <h5>{testNumber} - {subject} - { dateFormat(testDate, "dddd, mmmm dS, yyyy") }</h5>

        </Link>
        </div>
        <div>
        {published &&
          <Button basic disabled color="green" size="small">Published { dateFormat(publishDate, "mmmm dS, yyyy") }</Button>
        }

        {(release && published) &&
          <Button basic disabled color="teal" size="small">Released { dateFormat(releaseDate, "mmmm dS, yyyy") }</Button>
        }
      </div>

        </div>

        <hr />

          <div className="course_row">

                <QuestionCountRow count={questionsCount} testId={id} courseId={this.props.courseId}

                />


                <AnswerCountRow answersCount={answersCount} accuracy={accuracy}

                />

                <ChallengeCountRow count={challengeCount} testId={id}

                />


                <PanelCountRow count={panelsCount} testId={id}

                  />

          </div>
          </Card.Content>
        </Card>

    )
  }
}
