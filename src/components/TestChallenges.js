import React,{Component} from 'react';
import '../css/App.css';
import ChallengeList from './ChallengeList'
import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class TestChallenges extends Component {

    render() {

      return (

      <div >
      <Segment  fluid="true"  secondary attached='top'>
      {Object.values(this.props.challenges).length>0 ?
          <Link  to={{
            pathname: "/challenge_dashboard",
            state:
              { course_id: this.props.testToRender.course.id,
                test_id: this.props.testToRender.id }
            }} >
            Challenges
          </Link>
              :
              <div>Challenges</div>
            }
              </Segment>
        <Segment style={{ minHeight: 400 }} textAlign='left' attached>
          <ChallengeList {...this.props.challenges}/>
        </Segment>
    </div>


        )
      }
    }

export default TestChallenges
