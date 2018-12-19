import React,{Component} from 'react';
import '../css/App.css';
//import { Form, FormGroup, Label, Input, } from 'reactstrap';
import { Form, Input, Button, Select } from 'semantic-ui-react'

import { Mutation, Query } from "react-apollo";

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

const USER_INSTITUTION_QUERY = gql`
query UserInstition($userid:ID!){
user(id:$userid){
  teacherInstitution{
    id
    name
  }
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
  const userid = sessionStorage.getItem('userid');
  const { name, schoolId, time, institutionId, department1 } = this.state
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

      <Query query={USER_INSTITUTION_QUERY} variables={{ userid: userid }}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error</div>

            const institutions = data.user.teacherInstitution.map(institution => ({  value:institution.id, text:institution.name}) )

            return (
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
          )
        }}
      </Query>

              <Mutation
                  mutation={ADD_COURSE_MUTATION}
                  variables={{ name: name,
                    schoolId:schoolId,
                    time: time,
                    institutionId: institutionId,
                    department1: department1 }}
                  onCompleted={data => this._confirm(data)}
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
      const { id } = data.addCourse
      this.props.history.push({
        pathname: `/course_dashboard`,
        state: { course_id: id  }
        })
    }

  }



export default AddCourse ;
