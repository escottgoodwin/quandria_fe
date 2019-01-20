import React,{Component} from 'react';
import '../css/App.css';
import { Query,Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Button, Grid, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import TestHeader from '../components/TestHeader'
import TestChallenges from '../components/TestChallenges'
import TestPerformance from '../components/TestPerformance'

import Error from './Error'
import PlaceholderQ from '../components/Placeholder'
import TestLoading from '../components/TestLoading'

const TEST_QUERY = gql`
query TestQuery($test_id:ID!){
  test(id:$test_id){
      id
      subject
      testNumber
      testDate
      release
      releaseDate
      published
      publishDate
    	course{
        id
        name
        courseNumber
      }
      panels{
        id
    }
    }
  }
`

const TEST_STATS_QUERY = gql`
query TestStats($testId:ID!,$courseId:ID!){
  userTestStats(testId:$testId,
  courseId:$courseId){
    name
    totalCorrect
    percentCorrect
    total
  }
}
`

const DELETE_TEST_MUTATION = gql`
  mutation DeleteTest(
    $test_id: ID!,
  ){
    updateTest(
      id: $test_id,
      deleted: true,
    ){
    id
    course{
      id
    }
  }
}
`

const CHALLENGE_TEST_QUERY = gql`
query ChallengeTestQuery($testId:ID!){
  challenges(where:{question:{test:{id:$testId}}},orderBy:addedDate_DESC){
    challenges{
      id
      challenge
      addedDate
      addedBy{
        firstName
        lastName
      }
      question{
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

class TestDashboard extends Component {

  render() {

    const { test_id } = this.props.location.state

    return (

      <Query query={TEST_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <TestLoading />
              if (error) return <Error error={error} />

              const testToRender = data.test

          return (

            <div className="main">
            <div className="container">
              <TestHeader  {...testToRender} />

              <Grid columns={2} stackable className="fill-content">
                <Grid.Row stretched>
                <Grid.Column  >

                <Query query={CHALLENGE_TEST_QUERY} variables={{ testId: test_id, courseId: testToRender.course.id }}>
                      {({ loading, error, data }) => {
                        if (loading) return <PlaceholderQ />
                        if (error) return <div>Error</div >

                        const challenges = data.challenges.challenges

                    return (

                    <TestChallenges testToRender={testToRender} challenges={challenges} />

                  )
                }}
              </Query>

                </Grid.Column>

                <Grid.Column >
                <div>


                <Segment secondary attached='top'>
                <Link  to={{
                pathname: "/student_performance",
                state:
                { course_id: testToRender.course.id,
                  test_id: testToRender.id }
                }} >
                Questions
                </Link>

                </Segment>

                <Query query={TEST_STATS_QUERY} variables={{ testId: test_id, courseId: testToRender.course.id }}>
                      {({ loading, error, data }) => {
                        if (loading) return <PlaceholderQ />
                        if (error) return <div>Error</div >

                        const stats = data.userTestStats

                    return (

                    <TestPerformance testId={testToRender.id} stats={stats}  />
                    )
                  }}
                </Query>

                </div>


                </Grid.Column>
              </Grid.Row>
              </Grid>


              <div style={{padding:"15px"}} >

              <Mutation
                  mutation={DELETE_TEST_MUTATION}
                  variables={{ test_id: test_id }}
                  onCompleted={data => this._confirm(data)}
                >
                  {mutation => (
                    <Button  color='red' onClick={mutation}>Delete Test</Button>
                  )}
                </Mutation>
                </div>
              </div>
</div>



          )
        }}
      </Query>
      )
    }

    _confirm = async data => {
      this.props.history.push({pathname: "/course_dashboard",
      state:
        { course_id: data.updateTest.course.id }})
    }
  }


export default TestDashboard
