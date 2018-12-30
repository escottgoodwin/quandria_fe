import React,{Component} from 'react';
import '../css/App.css';
//import { Form, FormGroup, Label, Input, } from 'reactstrap';
import { Form, Input, Button, Select } from 'semantic-ui-react'

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
        course_message:'',
        institutions:''
      }

  handleChange = (event, {name, value}) => {
      if (this.state.hasOwnProperty(name)) {
        this.setState({ [name]: value });
      }
  }

render() {
  const user =  JSON.parse(sessionStorage.getItem('user'));
  const { name, schoolId, time, department1, institutionId } = this.state
  const institutions = user.teacherInstitutions.map(institution => ({value: institution.id, text: institution.name}))
  const institutions1 = [{value: '1', text: 'usc'},{value: '2', text: 'ucsd'}]

  console.log(institutionId)

  return (
        <div className="dashboard">
          <div className="signin">
            <h2>Add Course</h2>
            <h6 style={{color:'green',height:10,padding:5}}>{this.state.course_message}</h6>

      <Form size="big">

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

      <Form.Field
        id='institutionId'
        control={Select}
        options={institutions}
        onChange={(event, {value}) => { this.setState({ institutionId: value })}}
        label='Institution'
        fluid
        selection
        placeholder='Select Institution'
      />

      </ Form>

              <Mutation
                  mutation={ADD_COURSE_MUTATION}
                  variables={{ name: name,
                    schoolId:schoolId,
                    time: time,
                    department1: department1,
                    institutionId: institutionId
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
                    <div style={{padding:'15px'}}>
                    <Button color='blue' onClick={mutation}>Submit</Button>
                    </div>
                  )}
                </Mutation>


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
