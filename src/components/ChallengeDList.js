import React,{Component} from 'react'
import '../css/App.css'
import { Table } from 'semantic-ui-react'

import ChallengeNavRow from '../components/ChallengeNavRow'

import { Query } from "react-apollo"
import Error from './Error'

import {CHALLENGE_DASHBOARD2_QUERY} from '../ApolloQueries'

class ChallengeDList extends Component {

  render() {
    const { test_id } = this.props
      return (



                <Query query={CHALLENGE_DASHBOARD2_QUERY} variables={{ testId: test_id }}>
                      {({ loading, error, data }) => {
                        if (loading) return <div>Loading...</div>
                        if (error) return <Error {...error} />

                        const challenges = data.challenges.challenges

                    return (

                  <Table celled selectable>

                   <Table.Body>
                  {
                    challenges.map(challenge =>
                    <ChallengeNavRow key={challenge.id}  changeChallenge={this.props.changeChallenge} {...challenge} test_id={test_id} />)
                }

                 </Table.Body>

                </Table>

          )
        }
      }
      </Query>

    )
  }
}

export default ChallengeDList
