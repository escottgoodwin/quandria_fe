import React,{Component} from 'react';
import '../css/App.css';
import {Row, Col} from 'reactstrap';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import TestHeader from '../components/TestHeader'
import TestPanels from '../components/TestPanels'
import TestChallenges from '../components/TestChallenges'
import TestPerformance from '../components/TestPerformance'

import Error from './Error'
import Loading from './Loading'

const TEST_QUERY = gql`
query TestQuery($test_id:ID!){
  test(id:$test_id){
      subject
      testNumber
      testDate
    	course{
        id
        name
        courseNumber
      }
    }
  }
`

class TestDashboard extends Component {

  render() {

    const { test_id }= this.props.location.state

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
              <Row>
                <Col >

               <TestPanels {...testToRender} />

                </Col>
                <Col >

                  <TestChallenges {...testToRender} />

                </Col>
                <Col >

                  <TestPerformance {...testToRender} />

                </Col>
              </Row>
              </div>
            </div>


        </div>
          )
        }}
      </Query>
      )
    }
  }


export default TestDashboard
