import React,{Component} from 'react';
import '../css/App.css';
import { Tab } from 'semantic-ui-react'
import ChallengeHeader from '../components/ChallengeHeader'

import ChallengeSection from '../components/ChallengeSection2'
import { Query } from "react-apollo";
import Error from './Error'
import ChallengeLoading from './ChallengeLoading'
import gql from "graphql-tag";

const CHALLENGE_QUERY = gql`
query ChallengeTestQuery($testId:ID!){
  challenges(where:{answer:{question:{test:{id:$testId}}}},orderBy:addedDate_DESC){
    challenges{
      id
      challenge
      addedDate
      addedBy{
        id
        firstName
        lastName
      }
      answer{
        id
        answer{
          choice
        }
        question{
          id
          question
          addedDate
          addedBy{
            id
            firstName
            lastName
          }
          choices{
            id
            choice
          }
        }
      }
      answer{
        id
        question{
          id
          panel{
            id
            link
          }
          question
          addedDate
          addedBy{
            id
            firstName
            lastName
          }
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

      <Query query={CHALLENGE_QUERY} variables={{ testId: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <ChallengeLoading />
              if (error) return <Error />

              const challenges = data.challenges.challenges

              const challengepanels = challenges.map(x => ({menuItem: x.challenge + ' - ' + x.addedBy.firstName + ' ' + x.addedBy.lastName, render: () => <ChallengeSection key={x.id} test_id={test_id} challenge={x}/>  }))

          return (
            <div className="main">

                <div className="container">



                  <div className="coursecontainer">

                  <h3>Challenges</h3>
                  <hr/>
                  <Tab menu={{ color:'teal',fluid: true, vertical: true }} menuPosition='left' panes={challengepanels} />

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
