import React,{Component} from 'react';
import '../css/App.css';
import ChallengeList from './ChallengeList'
import { Segment } from 'semantic-ui-react'

class TestChallenges extends Component {

    render() {

      return (

      <div >
        <Segment style={{ minHeight: 400 }} textAlign='left' attached>
          <ChallengeList {...this.props.challenges}/>
        </Segment>
    </div>


        )
      }
    }

export default TestChallenges
