import React,{Component} from 'react';
import '../css/App.css';

import ChallengeHeader from '../components/ChallengeHeader'
import ChallengePList from '../components/ChallengePList'

import { Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'
import gql from "graphql-tag";

const CHALLENGE_QUERY = gql`
query TestChallenges($test_id:ID!){
  test(id:$test_id){
      id
      subject
      testNumber
      testDate
      course{
        id
        name
        courseNumber
      }
      questions{
        challenges{
          challenge
          id
          question{
            question
            addedBy{
              firstName
              lastName
            }
          }
          addedBy{
            firstName
            lastName
          }
        }
      }

    }
}
`
class ChallengeDashboard extends Component {

  render() {
    const { test_id } = this.props.location.state

      return (

      <Query query={CHALLENGE_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error />

              const testToRender = data.test

              const challenges = testToRender.questions.map(question => question.challenges.map(challenge => challenge)).flat()

          return (
<div className="main">


    <div className="container">

      <ChallengeHeader {...testToRender}/>

      <div className="coursecontainer">

      <h3>Challenges</h3>
        <div style={{width:"400px"}}>

            <ChallengePList {...challenges}/>

          </div>

      </div>
    </div>


</div>
)
}


}
</Query>
)
}
}


export default ChallengeDashboard
