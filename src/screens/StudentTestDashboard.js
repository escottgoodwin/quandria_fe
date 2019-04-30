import React,{Component} from 'react';
import '../css/App.css';
import { Query } from "react-apollo";
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import TestHeaderStudent from '../components/TestHeaderStudent'
import TestStats from '../components/TestStats'
import TestQuestionStats from '../components/TestQuestionStats'

import Error from './Error'
import TestLoading from '../components/TestLoading'
import {TEST_QUERY} from '../ApolloQueries';

class StudentTestDashboard extends Component {

  render() {

    const { test_id } = this.props.location.state

    return (

      <Query query={TEST_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <TestLoading />
              if (error) return <Error error={error} />

              const testToRender = data.test

          return (

            <div className="main">
            <div className="container">
              <TestHeaderStudent  {...testToRender} />

              <div className="coursecontainer">

              <Link  to={{
                pathname: "/student_test_panels",
                state:
                  {
                    test_id: test_id }
                }} >
                <Button color="blue" >{testToRender.panels.length} Panels</Button>
              </Link>

              <div className="coursecontainer">

              <TestStats test_id={test_id} />

              <TestQuestionStats test_id={test_id} />

              </div>
            </div>

              </div>
</div>



          )
        }}
      </Query>
      )
    }
  }


export default StudentTestDashboard
