import React,{Component} from 'react';
import '../css/App.css';
import { Form, Input, Button, Select } from 'semantic-ui-react'
import {  DateTimeInput } from 'semantic-ui-calendar-react';
import moment from 'moment'

import { Mutation, Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'
import gql from "graphql-tag";

import AddTestHeader from '../components/AddTestHeader'

const ADD_TEST_MUTATION = gql`
mutation AddTest(
  $subject:String!
  $testDate: DateTime,
  $testNumber: String,
  $courseId:ID!){
    addTest(subject:$subject,
      testDate:$testDate,
      testNumber:$testNumber,
      courseId:$courseId){
        id
      }
    }
    `

const COURSE_QUERY = gql`
  query COURSE($course_id:ID!){
    course(id:$course_id){
      name
      courseNumber
      time
      id
    }
  }
  `

class AddTest extends Component {


      state = {
            testNumber:'',
            subject:'',
            testDate:'',
    }

    handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

    render() {
      const { course_id } = this.props.location.state
      const { testNumber, subject, testDate } = this.state
      const testDate1 = moment(testDate).format()
      const testnumbers = [{value:"Test 1",text:"Test 1"}, {value:"Test 2",text:"Test 2"}, {value:"Test 3",text:"Test 3"}, {value:"Test 4",text:"Test 4"}, {value:"Test 5",text:"Test 5"}, {value:"Test 6",text:"Test 6"}]
      return (
  <div className="dashboard">
    <div className="signin">
      <h2>Add Test</h2>

      <Query query={COURSE_QUERY} variables={{ course_id: course_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error/>

              const course = data.course

              return (
                <AddTestHeader  {...course} />
            )
          }}
        </Query>

      <Form >

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
          onCompleted={data => this._confirm(data)}
          refetchQueries={() => {
             return [{
                query: gql`
                query CourseQuery($courseid:ID!){
                  course(id:$courseid){
                    id
                    name
                    courseNumber
                    time
                    institution{
                      name
                    }
                    tests{
                      id
                      subject
                      deleted
                      testNumber
                      release
                      testDate
                      questions{
                        id
                      }
                      panels{
                        id
                      }
                    }
                  }
                }
              `,
                variables: { courseid: course_id }
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

export default AddTest
