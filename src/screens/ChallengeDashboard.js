import React,{Component} from 'react';
import '../css/App.css';
import { Tab } from 'semantic-ui-react'
import ChallengeHeader from '../components/ChallengeHeader'

import ChallengeSection from '../components/ChallengeSection'
import { Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'
import gql from "graphql-tag";

const CHALLENGE_QUERY = gql`
query TestChallenges($test_id:ID!){
  test(id:$test_id){
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
        challenges{
          challenge
          addedBy{
            id
            firstName
            lastName
          }
          id
          question{
            question
            choices{
              correct
              choice
            }
						questionAnswers{
              addedBy{
                id
                firstName
              }
              answer{
                choice
              }
            }
            panel{
              link
            }
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
class ChallengeDashboard extends Component {

  render() {
    const { test_id } = this.props.location.state

      return (

      <Query query={CHALLENGE_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error />

              const testToRender = data.test

              const challenges = testToRender.questions.map(question => question.challenges.map(challenge => challenge)).flat()

              const challengepanels = challenges.map(x => ({menuItem: x.challenge + ' - ' + x.addedBy.firstName + ' ' + x.addedBy.lastName, render: () => <ChallengeSection key={x.id} {...x}/>  }))

              console.log(testToRender.questions[0].challenges[0].addedBy.id)
          return (
            <div className="main">


                <div className="container">

                  <ChallengeHeader {...testToRender}/>

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
