import React,{Component} from 'react';
import '../css/App.css';

import { Table } from 'semantic-ui-react'
import ChallengeHeader from '../components/ChallengeHeader'

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
class Challenges extends Component {

  render() {
    const { test_id } = this.props.location.state

      return (


      <Query query={CHALLENGE_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error />

              const testToRender = data.tests.tests[0]

              const challenges = new Array(testToRender.questions.filter(question => question.challenges.length>0))
              console.log(challenges)
          return (
<div className="main">


    <div className="container">

      <ChallengeHeader {...testToRender}/>

      <div className="coursecontainer">

      <h3>Challenges</h3>

          <Table celled selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Challenge</Table.HeaderCell>
        <Table.HeaderCell>Question</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
  <Table.Row>
    <Table.Cell>John</Table.Cell>
    <Table.Cell>No Action</Table.Cell>
    <Table.Cell>None</Table.Cell>
  </Table.Row>
  <Table.Row>
    <Table.Cell>John</Table.Cell>
    <Table.Cell>No Action</Table.Cell>
    <Table.Cell>None</Table.Cell>
  </Table.Row>
  </Table.Body>
</Table>

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


export default Challenges ;
