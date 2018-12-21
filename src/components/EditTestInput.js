import React,{Component} from 'react';
import '../css/App.css';
import { Form, Input, Button, Select } from 'semantic-ui-react'
import {  DateTimeInput } from 'semantic-ui-calendar-react';
import { Mutation } from "react-apollo";
import {withRouter} from "react-router-dom"
import moment from 'moment'

import gql from "graphql-tag";

const TEST_COURSE_MUTATION = gql`
  mutation UpdateTest(
    $subject: String!,
    $testDate:DateTime,
    $testNumber: String,
    $id:ID!
  ){
    updateTest(
      subject: $subject,
      testDate: $testDate,
      testNumber: $testNumber
      id:$id
    ){
    id
  }
}
`

class EditTestInput extends Component {

      state = {
            subject: this.props.subject,
            testDate:moment(this.props.testDate).format(),
            testNumber:this.props.testNumber,
  }

  handleChange = (event, {name, value}) => {
  if (this.state.hasOwnProperty(name)) {
    this.setState({ [name]: value });
  }
}

render() {

  const { subject, testDate, testNumber } = this.state
  const testnumbers = [{value:"Test 1",text:"Test 1"}, {value:"Test 2",text:"Test 2"}, {value:"Test 3",text:"Test 3"}, {value:"Test 4",text:"Test 4"}, {value:"Test 5",text:"Test 5"}, {value:"Test 6",text:"Test 6"}]

  const testDate1 = moment(testDate).format()
  return (

    <div>

    <Form size='big'>

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
      value={this.state.testNumber}
      onChange={(event, {value}) => { this.setState({ testNumber: value })}}
      label='Test Number'
      fluid
      selection
      placeholder='Select Test Number'
    />
    </Form.Group>

          </Form>

            <Mutation
                mutation={TEST_COURSE_MUTATION}
                variables={{ subject: subject,
                  testNumber: testNumber,
                  testDate: testDate1,
                  id: this.props.id
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
                      variables: { userid: this.props.course.id }
                  }, {
                     query: gql`
                     query TestQuery($test_id:ID!){
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
                           panels{
                             id
                         }
                         }
                       }
                   `,
                     variables: { test_id: this.props.id }
                 }];
              }}
              >
                {mutation => (
                  <Button  color='blue' onClick={mutation}>Submit</Button>
                )}
              </Mutation>

          </div>


)
}
_confirm = async data => {
  this.props.history.push({
    pathname: `/test_dashboard`,
    state: { test_id: this.props.id  }
    })
}

}

export default withRouter(EditTestInput)
