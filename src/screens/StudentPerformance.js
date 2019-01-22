import React,{Component} from 'react';
import '../css/App.css';
import { Segment, Grid } from 'semantic-ui-react'
import ChallengeHeader from '../components/ChallengeHeader'
import TestPerformanceAll from '../components/TestPerformanceAll'
import TestQuestionPerformance from '../components/TestQuestionPerformance'
import PlaceholderQ from '../components/Placeholder'
import StudentPerformanceLoading from './StudentPerformanceLoading'
import { Query } from "react-apollo";
import Error from './Error'
import gql from "graphql-tag";
const uuidv4 = require('uuid/v4');

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
      }
    }
  }
}
`

const USER_TEST_STATS_QUERY = gql`
  query TestStats($testId:ID!, $courseId:ID!){
    userTestStats(testId: $testId,
    courseId: $courseId){
      id
      name
      totalCorrect
      percentCorrect
      total
    }
  }
  `

  const TEST_STATS_QUERY = gql`
  query TestStats($testId:ID!){
    testStats(testId:$testId){
      totalCorrect
      total
    }
  }
  `

  const TEST_QUESTION_STATS_QUERY = gql`
  query TestQuestionStats($testId:ID!){
    testQuestionStats(testId: $testId){
      panelLink
      question
      total
      totalCorrect
      percentCorrect
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
              if (loading) return <StudentPerformanceLoading />
              if (error) return <Error error={error} />

              const testToRender = data.tests.tests[0]

          return (


      <ChallengeHeader {...testToRender}/>

      )
    }
  }
    </Query>

      <div className="coursecontainer">

      <Query query={TEST_STATS_QUERY} variables={{ testId: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading</div >
              if (error) return <div>Error</div >

              const stats = data.testStats

          return (

            <div >
              <div><h4><b>Percent Correct:</b> { stats.totalCorrect/stats.total >0 ? (stats.totalCorrect/stats.total)*100 : 0 }% </h4></div>
              <div><h4><b>Total Correct:</b> {stats.totalCorrect}  <b>Total:</b> {stats.total}</h4></div>
            </div>
            )
          }}
          </Query>
      <div className="coursecontainer">
      <Grid columns={2} stackable className="fill-content">
        <Grid.Row stretched>
        <Grid.Column  >
          <Segment  secondary attached='top'>
          <h6>Student</h6>
        </Segment>


          <Query query={USER_TEST_STATS_QUERY} variables={{ testId: test_id, courseId: course_id }}>
                {({ loading, error, data }) => {
                  if (loading) return <PlaceholderQ />
                  if (error) return <div>Error</div >

                  const stats = []
                  data.userTestStats.forEach(function(element) {
                  const id = uuidv4()
                    const item =  {
                      id: id,
                      name: element.name,
                      total: element.total,
                      totalCorrect: element.totalCorrect,
                      percentCorrect: element.percentCorrect
                    }
                    stats.push(item)
                  });

              return (

              <TestPerformanceAll testId={test_id} stats={stats}  />
              )
            }}
          </Query>

        </Grid.Column  >

        <Grid.Column  >
        <Segment  secondary attached='top'>
        <h6>Questions</h6>
      </Segment>
      <Query query={TEST_QUESTION_STATS_QUERY} variables={{ testId: test_id, courseId: course_id }}>
            {({ loading, error, data }) => {
              if (loading) return <PlaceholderQ />
              if (error) return <div>Error</div >

              const stats = data.testQuestionStats

          return (

          <TestQuestionPerformance stats={stats}  />

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
