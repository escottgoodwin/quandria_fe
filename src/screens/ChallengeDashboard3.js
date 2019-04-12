import React,{Component} from 'react'
import '../css/App.css'
import { Table, Grid, Segment } from 'semantic-ui-react'
import ChallengeHeader from '../components/ChallengeHeader'

import ChallengeSection from '../components/ChallengeSection3'
import ChallengeNavRow from '../components/ChallengeNavRow'

import { Route } from 'react-router-dom'

import { Query } from "react-apollo"
import Error from './Error'
import ChallengeLoading from './ChallengeLoading'

import {TEST_CHALLENGE_QUERY, CHALLENGE_DASHBOARD2_QUERY} from '../ApolloQueries'

class ChallengeDashboard extends Component {

  render() {
    const { test_id } = this.props.location.state

      return (


            <div className="main">

                <div className="container">

                <Query query={TEST_CHALLENGE_QUERY} variables={{ testId: test_id }}>
                      {({ loading, error, data }) => {
                        if (loading) return <ChallengeLoading />
                        if (error) return <Error {...error}/>

                        const testToRender = data.test

                    return (

                      <ChallengeHeader {...testToRender} />

                    )
                  }
                }
                </Query>

                <Query query={CHALLENGE_DASHBOARD2_QUERY} variables={{ testId: test_id }}>
                      {({ loading, error, data }) => {
                        if (loading) return <ChallengeLoading />
                        if (error) return <Error {...error}/>

                        const challenges = data.challenges.challenges

                    return (
                  <div className="coursecontainer">

                  <h3>Challenges</h3>
                  <hr/>

                  <Grid columns={2} >
                  <Grid.Row >
                  <Grid.Column width={6}>
                  <Segment style={{ minHeight: 500, overflow: 'auto' }} attached>
                  <Table celled selectable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Challenge List</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                   <Table.Body>
                  {
                    challenges.map(challenge =>
                    <ChallengeNavRow key={challenge.id} {...challenge} />)
                }
                 </Table.Body>
                </Table>
                </Segment>
                  </Grid.Column >

                  <Grid.Column centered='true' width={10}>
                  <Segment style={{ minHeight: 500, overflow: 'auto' }} attached>
                  Challenge
                  <Route path="/challenge_panel/" component={ChallengeSection} />
                  </Segment>
                  </Grid.Column>
                  </Grid.Row>
                  </Grid>
                  </div>
          )
        }
      }
      </Query>
      </div>
      </div>
    )
  }
}

export default ChallengeDashboard
