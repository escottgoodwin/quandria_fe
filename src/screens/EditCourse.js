import React,{Component} from 'react';
import '../css/App.css';
//import { Form, FormGroup, Label, Input, } from 'reactstrap';
import { Form, Input, Button } from 'semantic-ui-react'

import { Mutation, Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'

import gql from "graphql-tag";

const EDIT_COURSE_MUTATION = gql`
  mutation updateCourse(
    $name: String!,
    $time:String,
    $schoolId: String,
    $department1: String
  ){
    addCourse(
      name: $name,
      time: $time,
      deleted: false,
      courseNumber: $schoolId,
      department1: $department1
    ){
    name
    id
  }
}
`

const COURSE_QUERY = gql`
  query courseQuery($course_id: ID!){
    course(id:$course_id){
      name
      time
      courseNumber
      department1
  }
}
`

class AddCourse extends Component {

  state = {
        department1: '',
        name:'',
        schoolId:'',
        time:'',
        course_message:''
      }

render() {
  const { course_id } = this.props.location.state
  const { name, schoolId, time, department1 } = this.state
  return (
        <div className="dashboard">
          <div className="signin">
            <h2>Add Course</h2>
            <h6 style={{color:'green',height:10,padding:5}}>{this.state.course_message}</h6>

            <Query query={COURSE_QUERY} variables={{ course_id: course_id }}>
                  {({ loading, error, data }) => {
                    if (loading) return <Loading />
                    if (error) return <Error />

                    const courseToRender = data.course

                    this.setState({
                      name: courseToRender.name,
                      schoolId: courseToRender.schoolId,
                      time: courseToRender.time,
                      department1: courseToRender.department1

                    })

                    return (

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
                    </Form>
                  )
                }}
              </Query>



              <Mutation
                  mutation={EDIT_COURSE_MUTATION}
                  variables={{ name: name,
                    schoolId:schoolId,
                    time: time,
                    department1: department1,
                   }}
                  onCompleted={data => this._confirm(data)}
                >
                  {mutation => (
                    <Button  color='blue' onClick={mutation}>Submit</Button>
                  )}
                </Mutation>


            </div>
        </div>
      )
    }

    _confirm = async data => {
      const { id } = data.updateCourse
      this.props.history.push({
        pathname: `/course_dashboard`,
        state: { course_id: id  }
        })
    }

  }



export default AddCourse ;
