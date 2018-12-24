import React,{Component} from 'react';
import '../css/App.css';
import {Row, Col} from 'reactstrap';
import { Query,Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Button } from 'semantic-ui-react'
import TestHeader from '../components/TestHeader'
import TestChallenges from '../components/TestChallenges'
import TestPerformance from '../components/TestPerformance'

import Error from './Error'
import Loading from './Loading'

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

class TestDashboard extends Component {

  render() {

    const { test_id } = this.props.location.state

    return (

      <Query query={TEST_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error/>

              const testToRender = data.test

          return (


        <div className="main">


            <div className="container">

              <TestHeader  {...testToRender} />

              <div className="coursecontainer">
              <div >
              <Row>

                <Col >

                <TestChallenges {...testToRender} />

                </Col>
                <Col >

                  <TestPerformance {...testToRender} />

                </Col>
              </Row>
              </div>
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
