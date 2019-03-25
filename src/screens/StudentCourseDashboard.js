import React,{Component} from 'react'
import '../css/App.css'

import CourseHeader from '../components/CourseHeader'
import StudentTestList from '../components/StudentTestList'
import { Query } from "react-apollo"
import gql from "graphql-tag"
import Error from './Error'

import CoursePlaceholder from './CoursePlaceholder'

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
        questionAnswers{
          challenge{
            challenge
          }
        answer{
          choice
          correct

        }
      }
      }
      panels{
        id
      }
    }
  }
}
`


class StudentCourseDashboard extends Component {

  render() {

    const { course_id }= this.props.location.state

    return (
    <Query query={COURSE_QUERY} variables={{ courseid: course_id }}>
          {({ loading, error, data }) => {
            if (loading) return <CoursePlaceholder />
            if (error) return <Error {...error} />

            const courseToRender = data.course
            const tests1 = courseToRender.tests.filter(test => !test.deleted)

        return (

      <div className="main">
        <div className="container">

              <CourseHeader {...courseToRender} />
              <StudentTestList tests={tests1} courseId={course_id} />
              <div >

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


export default StudentCourseDashboard
