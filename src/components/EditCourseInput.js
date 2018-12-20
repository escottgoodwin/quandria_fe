import React,{Component} from 'react';
import '../css/App.css';
import { Form, Input, Button } from 'semantic-ui-react'
import { Mutation } from "react-apollo";
import {withRouter} from "react-router-dom"

import gql from "graphql-tag";

const EDIT_COURSE_MUTATION = gql`
  mutation UpdateCourse(
    $name: String!,
    $time:String,
    $courseNumber: String,
    $department1: String
    $id:ID!
  ){
    updateCourse(
      name: $name,
      time: $time,
      courseNumber: $courseNumber,
      department1: $department1
      id:$id
    ){
    name
    id
  }
}
`

class EditCourseInput extends Component {

      state = {
            department1: this.props.department1,
            name:this.props.name,
            courseNumber:this.props.courseNumber,
            time:this.props.time,
  }

render() {
  const user =  JSON.parse(sessionStorage.getItem('user'));
  const { name, courseNumber, time, department1 } = this.state
  return (

    <div>

          <Form size='big'>

          <Form.Field
            id='name'

            control={Input}
            label='Course Name'
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            placeholder='Course Name'
          />
          <Form.Field
            id='schoolId'
            control={Input}
            label='Course Number'
            value={courseNumber}
            onChange={e => this.setState({ courseNumber: e.target.value })}
            placeholder='Course Number eg. BUS 101'
          />
          <Form.Field
            id='time'
            control={Input}
            label='Time'
            value={time}
            onChange={e => this.setState({ time: e.target.value })}
            placeholder='Time eg. MWF 12:00-1:20'
          />

          <Form.Field
            id='department1'
            control={Input}
            label='Department'
            value={department1}
            onChange={e => this.setState({ department1: e.target.value })}
            placeholder='eg. Biology'
          />
          </Form>

            <Mutation
                mutation={EDIT_COURSE_MUTATION}
                variables={{ name: name,
                  courseNumber: courseNumber,
                  time: time,
                  department1: department1,
                  id: this.props.id
                 }}
                onCompleted={data => this._confirm(data)}
                refetchQueries={() => {
                   return [{
                      query: gql`
                      query UserQuery($userid: ID!) {
                        user(id: $userid){
                          id
                          firstName
                          lastName
                          teacherCourses{
                            id
                            name
                            time
                            deleted
                            courseNumber
                            department1
                            institution{
                              name
                            }
                            students{
                              id
                            }
                            tests{
                              id
                              panels{
                                id
                              }
                            }
                          }
                        }
                      }
                    `,
                      variables: { userid: user.id }
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
  const { id } = data.updateCourse
  this.props.history.push({
    pathname: `/course_dashboard`,
    state: { course_id: this.props.id  }
    })
}

}

export default withRouter(EditCourseInput)
