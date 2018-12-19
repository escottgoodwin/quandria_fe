import React,{Component} from 'react';
import '../css/App.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ChallengeList from './ChallengeList'
import { Card, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom'

const CHALLENGE_QUERY = gql`
query TestChallenges($test_id:ID!){
  tests(where:{id:$test_id}){
    tests{
      id
      course{
        id
      }
      questions{
        id
        question
        addedBy{
          firstName
          lastName
        }
        challenges{
          id
          challenge
          addedBy{
            firstName
            lastName
          }
        }
      }
    }
  }
}
`

  class TestChallenges extends Component {

    render() {

      return (

        <Query query={CHALLENGE_QUERY} variables={{ test_id: this.props.id }}>
              {({ loading, error, data }) => {
                if (loading) return <div>Loading... </div>
                if (error) return <div>Error</div>

                const testToRender = data.tests.tests[0]

                const challenges = new Array(testToRender.questions.filter(question => question.challenges.length>0))
                console.log(challenges)
            return (

              <Card className="smallcard" body>
              <Link  to={{
                pathname: "/challenge_dashboard",
                state:
                  { course_id: testToRender.course.id,
                    test_id: testToRender.id }
                }} ><CardHeader>Challenges</CardHeader></Link>
                <ChallengeList {...challenges}/>
              </Card>

            )
          }}
        </Query>
        )
      }
    }

export default TestChallenges
