import React,{Component} from 'react';
import '../css/App.css';
import { Segment, Grid } from 'semantic-ui-react'
import ChallengeHeader from '../components/ChallengeHeader'
import TestPerformance from '../components/TestPerformance'
import PlaceholderQ from '../components/Placeholder'

import { Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'
import gql from "graphql-tag";


const CHALLENGE_QUERY = gql`
query TestChallenges($test_id:ID!){
  tests(where:{id:$test_id}){
    tests{
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

const TEST_STATS_QUERY = gql`
  query TestStats($testId:String,$courseId:String){
    userTestStats(testId:$testId,
    courseId:$courseId){
      name
      totalCorrect
      percentCorrect
      total
    }
  }
  `

class StudentPerformance extends Component {

  state = {
    courseId: '',
  }

  render() {
    const { test_id, course_id } = this.props.location.state

      return (

        <div className="main">


        <div className="container">

      <Query query={CHALLENGE_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error />

              const testToRender = data.tests.tests[0]

          return (


      <ChallengeHeader {...testToRender}/>

    )
    }
  }
    </Query>

      <div className="coursecontainer">

      <h3>Performance</h3>

      <div className="coursecontainer">
      <Grid columns={2} stackable className="fill-content">
        <Grid.Row stretched>
        <Grid.Column  >
          <Segment  secondary attached='top'>
          <h5>Student</h5>
        </Segment>

          <Query query={TEST_STATS_QUERY} variables={{ testId: test_id, courseId: course_id }}>
                {({ loading, error, data }) => {
                  if (loading) return <PlaceholderQ />
                  if (error) return <div>Error</div >

                  const stats = data.userTestStats

              return (

              <TestPerformance stats={stats}  />
              )
            }}
          </Query>

        </Grid.Column  >

        <Grid.Column  >
        <Segment  secondary attached='top'>
        <h5>Questions</h5>
      </Segment>
      <Query query={TEST_STATS_QUERY} variables={{ testId: test_id, courseId: course_id }}>
            {({ loading, error, data }) => {
              if (loading) return <PlaceholderQ />
              if (error) return <div>Error</div >

              const stats = data.userTestStats

          return (

          <TestPerformance stats={stats}  />
          )
        }}
      </Query>

          </Grid.Column  >


      </Grid.Row>
      </Grid>

      </div>
    </div>
    </div>
    </div>




)
}
}



export default StudentPerformance ;
