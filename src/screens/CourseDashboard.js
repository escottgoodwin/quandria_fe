import React,{Component} from 'react';
import '../css/App.css';

import CourseHeader from '../components/CourseHeader'
import TestList from '../components/TestList'
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Button } from 'semantic-ui-react'
import Error from './Error'
import Loading from './Loading'

const COURSE_QUERY = gql`
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
`

const DELETE_COURSE_MUTATION = gql`
  mutation DeleteCourse(
    $course_id: ID!,
  ){
    updateCourse(
      id: $course_id,
      deleted: true,
    ){
    name
    id
  }
}
`

class CourseDashboard extends Component {

  render() {

    const { course_id }= this.props.location.state

    return (
    <Query query={COURSE_QUERY} variables={{ courseid: course_id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />
            if (error) return <Error/>

            const courseToRender = data.course
            const tests = new Array(courseToRender.tests.filter(test => !test.deleted))

        return (

      <div className="main">

          <div className="container">

            <CourseHeader {...courseToRender} />

            <div className="coursecontainer">

              <TestList {...tests} />
              <div >

              <Mutation
                  mutation={DELETE_COURSE_MUTATION}
                  variables={{ course_id: course_id }}
                  onCompleted={data => this._confirm(data)}
                >
                  {mutation => (
                    <Button  color='red' onClick={mutation}>Delete Course</Button>
                  )}
                </Mutation>
              </div>
            </div>

          </div>

      </div>
        )
      }}
    </Query>
    )
  }
  _confirm = async data => {

    this.props.history.push(`/teacher_dashboard`)
  }
}


export default CourseDashboard
