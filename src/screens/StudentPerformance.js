import React,{Component} from 'react';
import '../css/App.css';
import { Table, Card, Row, Col, } from 'reactstrap';
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
class StudentPerformance extends Component {

  render() {
    const { test_id } = this.props.location.state

      return (


      <Query query={CHALLENGE_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error />

              const testToRender = data.tests.tests[0]

          return (
<div className="main">


    <div className="container">

      <ChallengeHeader {...testToRender}/>

      <div className="coursecontainer">


      <h3>Student Performance</h3>

      <div className="coursecontainer">
      <Row>
        <Col >
          <Card className="card" body>

        <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Questions</th>
          </tr>
        </thead>

        <tbody>
        <tr>
          <td>Mark</td>
          <td>67</td>
        </tr>

        <tr>
          <td>Mr. T</td>
          <td>57</td>
        </tr>

        <tr>
          <td>Royal</td>
          <td>47</td>
        </tr>

        </tbody>
      </Table>
          </Card>
        </Col>

        <Col >
          <Card className="card" body>
          <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Accuracy</th>
          </tr>
        </thead>

        <tbody>
        <tr>
          <td>Mark</td>
          <td>67%</td>
        </tr>
        <tr>
          <td>Mr. T</td>
          <td>57%</td>
        </tr>
        <tr>
          <td>Royal</td>
          <td>47%</td>
        </tr>
        </tbody>
      </Table>
          </Card>
        </Col>

      </Row>
      </div>
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



export default StudentPerformance ;
