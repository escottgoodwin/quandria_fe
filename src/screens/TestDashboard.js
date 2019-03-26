import React,{Component} from 'react';
import '../css/App.css';
import { Query,Mutation } from "react-apollo";
import { Button, Grid, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import TestHeader from '../components/TestHeader'
import TestChallenges from '../components/TestChallenges'
import TestPerformance from '../components/TestPerformance'

import Error from './Error'
import PlaceholderQ from '../components/Placeholder'
import TestLoading from '../components/TestLoading'
import {TEST_QUERY,DELETE_TEST_MUTATION,CHALLENGE_TEST_QUERY,TEST_STATS_QUERY, TEACHER_DASHBOARD_QUERY} from '../ApolloQueries';

const uuidv4 = require('uuid/v4');

class TestDashboard extends Component {

  render() {

    const { test_id } = this.props.location.state
    const userid = sessionStorage.getItem('userid')

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
                <Segment  fluid="true"  secondary attached='top'>

                    <Link  to={{
                      pathname: "/challenge_dashboard",
                      state:
                      { course_id: testToRender.course.id,
                        test_id: testToRender.id }
                      }} >
                      Challenges
                    </Link>

                </Segment>
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
                  refetchQueries={() => {
                     return [{
                        query: TEACHER_DASHBOARD_QUERY,
                        variables: { userid }
                    }]
                }}
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
