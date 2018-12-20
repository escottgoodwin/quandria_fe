import React,{Component} from 'react';
import '../css/App.css';
//import { Form, FormGroup, Label, Input, } from 'reactstrap';
import { Form, Input, Button } from 'semantic-ui-react'

import { Mutation } from "react-apollo";

import gql from "graphql-tag";

const ADD_COURSE_MUTATION = gql`
  mutation AddCourse(
    $name: String!,
    $time:String,
    $schoolId: String,
    $institutionId: ID!,
    $department1: String
  ){
    addCourse(
      name: $name,
      time: $time,
      deleted: false,
      courseNumber: $schoolId,
      institutionId: $institutionId,
      department1: $department1
    ){
    name
    id
  }
}
`

class AddCourse extends Component {

  state = {
        institutionId:'',
        department1: '',
        name:'',
        schoolId:'',
        time:'',
        course_message:''
      }

render() {
  const user =  JSON.parse(sessionStorage.getItem('user'));
  const { name, schoolId, time, department1 } = this.state
  return (
        <div className="dashboard">
          <div className="signin">
            <h2>Add Course</h2>
            <h6 style={{color:'green',height:10,padding:5}}>{this.state.course_message}</h6>

      <Form >

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
        value={schoolId}
        onChange={e => this.setState({ schoolId: e.target.value })}
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
      <div style={{padding:15}}>
      <h4><b>Institution:</b> {user.institution.name}</h4>
      </div>

              <Mutation
                  mutation={ADD_COURSE_MUTATION}
                  variables={{ name: name,
                    schoolId:schoolId,
                    time: time,
                    department1: department1,
                    institutionId: user.institution.id
                  }}
                  onCompleted={data => this._confirm(data)}
                  refetchQueries={() => {
                     console.log("refetchQueries", user.id)
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
                }}  >
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
      const { id } = data.addCourse
      this.props.history.push({
        pathname: `/course_dashboard`,
        state: { course_id: id  }
        })
    }

  }



export default AddCourse ;
