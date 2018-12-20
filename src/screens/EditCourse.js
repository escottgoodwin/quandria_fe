import React,{Component} from 'react';
import '../css/App.css';
//import { Form, FormGroup, Label, Input, } from 'reactstrap';
import { Form, Input, Button } from 'semantic-ui-react'

import { Mutation, Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'

import EditCourseInput from '../components/EditCourseInput'

import gql from "graphql-tag";


const COURSE_QUERY = gql`
  query CourseQuery($course_id: ID!){
    course(id:$course_id){
      name
      time
      courseNumber
      department1
      id
  }
}
`

class EditCourse extends Component {

render() {

  return (


    <Query query={COURSE_QUERY} variables={{ course_id: this.props.location.state.course_id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading/>
            if (error) return <Error/>

            const courseToRender = data.course

        return (

        <div className="dashboard">
          <div className="signin">
            <h2>Edit Course</h2>
            <h6 style={{color:'green',height:10,padding:5}}></h6>
            <EditCourseInput {...courseToRender}/>
                    </div>
                      </div>

            )
          }}
        </Query>

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



export default EditCourse ;
