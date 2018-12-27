import React,{Component} from 'react';
import '../css/App.css';
import { Form, Button, Select } from 'semantic-ui-react'
import {  DateTimeInput } from 'semantic-ui-calendar-react';
import moment from 'moment'

import { Mutation, Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'
import gql from "graphql-tag";

import EditTestHeader from '../components/EditTestHeader'

const PUBLISH_TEST_MUTATION = gql`
mutation EditPublishTest(
  $startHour:String!
  $testEndDate: DateTime,
  $endHour: String!
  $testId:ID!){
    publishTest(
      startHour:$subject,
      endHour:$testDate,
      testEndDate:$testEndDate,
      testId:$testId){
        id
      }
    }
    `

const TEST_QUERY = gql`
  query TestQuery($test_id: ID!){
    test(id:$test_id){
      subject
      testDate
      testNumber
      id
      course {
        id
        name
        courseNumber
      }
  }
}
`

class EditPublishTest extends Component {

  state = {
        startHour: this.props.startHour,
        testEndDate:moment(this.props.testEndDate).format(),
        endHour:this.props.endHour,

        }

    handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

    render() {
      const { test_id } = this.props.location.state
      const { startHour, endHour, testEndDate } = this.state

      const testEndDate1 = moment(testEndDate).format()

      const statStopNumbers = [
      {value:"Test 1",text:"6 AM"},
      {value:"Test 2",text:"7 AM"},
      {value:"Test 3",text:"8 AM"},
      {value:"Test 4",text:"9 AM"},
      {value:"Test 5",text:"10 AM"},
      {value:"Test 6",text:"11 AM"},
      {value:"Test 1",text:"12 PM"},
      {value:"Test 2",text:"1 PM"},
      {value:"Test 3",text:"2 PM"},
      {value:"Test 4",text:"3 PM"},
      {value:"Test 5",text:"4 PM"},
      {value:"Test 2",text:"5 PM"},
      {value:"Test 3",text:"6 PM"},
      {value:"Test 4",text:"7 PM"},
      {value:"Test 5",text:"8 PM"},
      {value:"Test 4",text:"9 PM"},
      {value:"Test 5",text:"10 PM"},
    ]

      return (
        <div className="main">
  <div className="dashboard">
    <div className="signin">

      <div style={{padding:"20px"}}>
      <Query query={TEST_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error/>

              const test = data.test

              return (
                <EditTestHeader  {...test} />
            )
          }}
        </Query>
      </div>

      <h2>Publish Test</h2>
      <Form size="big">

      <DateTimeInput
      label='Test End Date'
      dateFormat="MM-DD-YYYY"
      timeFormat="AMPM"
          name="testEndDate"
          placeholder="Test End Date"
          value={this.state.testEndDate}
          iconPosition="left"
          onChange={this.handleChange} />

      <Form.Group widths='equal'>

      <Form.Field
        id='startHour'
        control={Select}
        options={statStopNumbers}
        onChange={(event, {value}) => { this.setState({ startHour: value })}}
        label='Start Time'
        fluid
        selection
        placeholder='Select Start Time'
      />

      <Form.Field
        id='stopHour'
        control={Select}
        options={statStopNumbers}
        onChange={(event, {value}) => { this.setState({ stopHour: value })}}
        label='Stop Time'
        fluid
        selection
        placeholder='Select Stop Time'
      />
      </Form.Group>

      <Mutation
          mutation={PUBLISH_TEST_MUTATION}
          variables={{
            startHour:startHour,
            endHour:endHour,
            testEndDate:testEndDate,
            published: true,
            testId: test_id
  }}
          onCompleted={data => this._confirm(data)}
          refetchQueries={() => {
             return [{
                query: gql`
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
                      questions{
                        challenges{
                          challenge
                          id
                          question{
                            question
                            addedBy{
                              firstName
                              lastName
                            }
                          }
                          addedBy{
                            firstName
                            lastName
                          }
                        }
                      }
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
              `,
                variables: { test_id: test_id }
            }];
        }}
        >
          {mutation => (
            <Button  color='blue' onClick={mutation}>Submit</Button>
          )}
        </Mutation>

      </Form>
    </div>
  </div>
  </div>
)
}

_confirm = async data => {
  const { id } = data.addTest
  this.props.history.push({
    pathname: `/test_dashboard`,
    state: { test_id: id  }
    })
  }
}

export default EditPublishTest
