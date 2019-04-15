import React,{Component} from 'react'
import '../css/App.css'
import { Grid, Segment } from 'semantic-ui-react'
import ChallengeHeader from '../components/ChallengeHeader'

import ChallengeSection from '../components/ChallengeSection3'
import ChallengeDList from '../components/ChallengeDList'


import { Query } from "react-apollo"
import Error from './Error'
import ChallengeLoading from './ChallengeLoading'

import {TEST_CHALLENGE_QUERY} from '../ApolloQueries'

class ChallengeDashboard extends Component {

  state = {
    challengeId: 'cjuemiclo00cv0738o2038u34',
    test_id:this.props.location.state.test_id
  }

  changeChallenge = (challengeId) =>
    this.setState({challengeId:challengeId})

  componentDidRender(){
    this.setState({test_id:this.props.location.state.test_id})
  }

  render() {

    const {challengeId,test_id} = this.state

    console.log(challengeId)
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

                  <div className="coursecontainer">

                  <h3>Challenges</h3>
                  <hr/>

                  <Grid columns={2} >
                  <Grid.Row >
                  <Grid.Column width={6}>
                  <Segment  fluid="true"  secondary attached='top'>
                    Challenges
                  </Segment>

                  <Segment style={{ maxHeight: 500, overflow: 'auto' }} attached>

                  <ChallengeDList changeChallenge={this.changeChallenge} test_id={test_id} />

                  </Segment>
                  </Grid.Column >

                  <Grid.Column centered='true' width={10}>


                  <Segment style={{ minHeight: 500, overflow: 'auto' }} attached>


                  <ChallengeSection challengeId={this.state.challengeId} />

                  </Segment>
                  </Grid.Column>
                  </Grid.Row>
                  </Grid>
                  </div>
                  </div>
                  </div>




    )
  }
}

export default ChallengeDashboard
