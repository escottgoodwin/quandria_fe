import React,{Component} from 'react';
import '../css/App.css';
import { Button, Card, Loader } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import PanelCountRow from './PanelCountRow'
import QuestionCountRow from './QuestionCountRow'
import AnswerCountRow from './AnswerCountRow'
import ChallengeCountRow from './ChallengeCountRow'
import Error from './Error'

import { Query } from "react-apollo";

import { PANEL_COUNT_SUBSCRIPTION, PANEL_COUNT_QUERY, QUESTION_COUNT_SUBSCRIPTION, QUESTION_COUNT_QUERY, CHALLENGE_COUNT_QUERY, CHALLENGE_COUNT_SUBSCRIPTION, TEST_STATS_PERFORMANCE_QUERY, ANSWER_STATS_SUBSCRIPTION} from '../ApolloQueries'

var dateFormat = require('dateformat')

export default class TestRow extends Component {

  render() {
    const { id, testNumber, subject, testDate, published, release, course  } = this.props.test
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
          <Button basic disabled color="green" size="small">Test Published</Button>
        }

        {(release && published) &&
          <Button basic disabled color="teal" size="small">Questions Released</Button>
        }
      </div>

        </div>

        <hr />

          <div className="course_row">

          <Query query={QUESTION_COUNT_QUERY} variables={{ testId: id }}>
                {({ loading, error, data, subscribeToMore }) => {
                  if (loading) return <Loader size='mini'></Loader>
                  if (error) return <Error {...error}/>

                  const count = data.questions.count

              return (
                <QuestionCountRow count={count} testId={id} courseId={course.id}
                  subscribeToNewQuestionCount={() =>
                    subscribeToMore({
                      document: QUESTION_COUNT_SUBSCRIPTION,
                      variables: {testId: id },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev
                        return {
                          questions:{
                            count: subscriptionData.data.questionCount.count,
                            __typename: prev.questions.__typename
                          }
                        }
                      }
                    }
                  )
                }
                />
                )
              }
            }
          </Query>

          <Query query={TEST_STATS_PERFORMANCE_QUERY} variables={{ testId: id }} fetchPolicy="network-only">
                {({ loading, error, data, subscribeToMore }) => {
                  if (loading) return  <Loader size='mini'></Loader>
                  if (error) return <Error {...error}/>

                  const testStats = data.testStats

              return (
                <AnswerCountRow {...testStats}
                  subscribeToNewAnswerCount={() =>
                    subscribeToMore({
                      document: ANSWER_STATS_SUBSCRIPTION,
                      variables: {testId: id },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev
                        return {
                          testStats: subscriptionData.data.testStats,
                        }
                      }
                    }
                  )
                }
                />
                )
              }
            }
          </Query>

          <Query query={CHALLENGE_COUNT_QUERY} variables={{ testId: id }} fetchPolicy="network-only">
                {({ loading, error, data, subscribeToMore }) => {
                  if (loading) return  <Loader size='mini'></Loader>
                  if (error) return <Error {...error}/>

                  const count = data.challenges.count

              return (
                <ChallengeCountRow count={count} testId={id}
                  subscribeToNewChallengeCount={() =>
                    subscribeToMore({
                      document: CHALLENGE_COUNT_SUBSCRIPTION,
                      variables: {testId: id },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev
                        return {
                          challenges:{
                            count: subscriptionData.data.challengeCount.count,
                            __typename: prev.challenges.__typename
                          }
                        }
                      }
                    }
                  )
                }
                />
                )
              }
            }
          </Query>

            <div>
            <h6>Challenges: <Link  to={{
              pathname: "/challenge_dashboard",
              state:
                {
                  test_id: id }
              }} >
               0
            </Link>
            </h6>
            </div>

            <Query query={PANEL_COUNT_QUERY} variables={{ testId: id }} fetchPolicy="network-only">
                  {({ loading, error, data, subscribeToMore }) => {
                    if (loading) return  <Loader size='mini'></Loader>
                    if (error) return <Error {...error}/>

                    const count = data.panels.count

                return (
                  <PanelCountRow count={count} testId={id}
                    subscribeToNewPanelCount={() =>
                      subscribeToMore({
                        document: PANEL_COUNT_SUBSCRIPTION,
                        variables: {testId: id },
                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data) return prev
                          return {
                            panels:{
                              count: subscriptionData.data.panelCount.count,
                              __typename: prev.panels.__typename
                            }
                          }
                        }
                      }
                    )
                  }
                  />
                  )
                }
              }
            </Query>


          </div>
          </Card.Content>
        </Card>

    )
  }
}
