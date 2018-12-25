import React,{Component} from 'react';
import '../css/App.css';
import ChallengeList from './ChallengeList'
import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class TestChallenges extends Component {

    render() {

      const challenges = this.props.questions.map(question => question.challenges.map(challenge => challenge)).flat()

      return (

      <div>
      <Segment  secondary attached='top'>
      {challenges.length>0 ?
          <Link  to={{
            pathname: "/challenge_dashboard",
            state:
              { course_id: this.props.course.id,
                test_id: this.props.id }
            }} >
            Challenges
              </Link>
              :
              <div>Challenges</div>
            }
              </Segment>
        <Segment textAlign='left' attached>
          <ChallengeList {...challenges}/>
        </Segment>
    </div>


        )
      }
    }

export default TestChallenges
