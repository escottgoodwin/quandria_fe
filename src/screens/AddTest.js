import React,{Component} from 'react';
import '../css/App.css';
import { Form, Input, Button, Select, Message } from 'semantic-ui-react'
import {  DateTimeInput } from 'semantic-ui-calendar-react';
import moment from 'moment'

import { Mutation, Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'

import {ADD_TEST_MUTATION, TEST_COURSE_QUERY, COURSE_QUERY} from '../ApolloQueries'

import AddTestHeader from '../components/AddTestHeader'

class AddTest extends Component {


    state = {
          testNumber:'',
          subject:'',
          testDate:'',
          graphQLError: '',
          isVisibleGraph:false,
          networkError:false,
          isVisibleNet:false,
        }

    handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

    render() {
      const { course_id } = this.props.location.state
      const { testNumber, subject, testDate, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state
      const testDate1 = moment(testDate).format()
      const testnumbers = [{value:"Test 1",text:"Test 1"}, {value:"Test 2",text:"Test 2"}, {value:"Test 3",text:"Test 3"}, {value:"Test 4",text:"Test 4"}, {value:"Test 5",text:"Test 5"}, {value:"Test 6",text:"Test 6"}]
      return (
        <div className="main">
        <div className="dashboard">
          <div className="signin">
            <h2>Add Test</h2>

      <Query query={TEST_COURSE_QUERY} variables={{ course_id: course_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error {...error}/>

              const course = data.course

              return (
                <AddTestHeader  {...course} />
            )
          }}
        </Query>

      <Form size="big">

      <Form.Field
        control={Input}
        label='Subject'
        value={subject}
        onChange={e => this.setState({ subject: e.target.value })}
        placeholder='Subject'
      />
      <Form.Group widths='equal'>

      <DateTimeInput
      label='Test Date'
      dateFormat="MM-DD-YYYY"
      timeFormat="AMPM"
          name="testDate"
          placeholder="Date Time"
          value={this.state.testDate}
          iconPosition="left"
          onChange={this.handleChange} />

      <Form.Field
        id='institutionId'
        control={Select}
        options={testnumbers}
        onChange={(event, {value}) => { this.setState({ testNumber: value })}}
        label='Test Number'
        fluid
        selection
        placeholder='Select Test Number'
      />
      </Form.Group>

      <Mutation
          mutation={ADD_TEST_MUTATION}
          variables={{
            subject: subject,
            testDate:testDate1,
            testNumber: testNumber,
            published: false,
            release:false,
            courseId: course_id
          }}

          refetchQueries={() => { return [{ query: COURSE_QUERY, variables: { courseid: course_id }}] }}
          onCompleted={data => this._confirm(data)}
        >
          {mutation => (
            <Button  color='blue' onClick={mutation}>Submit</Button>
          )}
        </Mutation>

        {isVisibleGraph &&
          <Message negative>
            <p><b>{graphQLError}</b></p>
          </Message>
        }

        {isVisibleNet &&
          <Message negative>
            <p><b>{networkError}</b></p>
          </Message>
        }

      </Form>
    </div>
  </div>
  </div>
)
}

_error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
    this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

    error.networkError &&
      this.setState({ isVisibleNet: true, networkError: error.networkError.message})

}

_confirm = async data => {
  const { id } = data.addTest
  this.props.history.push({
    pathname: `/test_dashboard`,
    state: { test_id: id  }
    })
  }
}

export default AddTest
