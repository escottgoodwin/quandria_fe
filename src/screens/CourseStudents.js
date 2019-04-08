import React,{Component} from 'react'
import '../css/App.css'
import CourseHeader from '../components/CourseHeader'
import StudentCourseList from '../components/StudentCourseList'
import { Query } from "react-apollo"
import Error from './Error'

import CoursePlaceholder from './CoursePlaceholder'

import {COURSE_STUDENT_QUERY} from '../ApolloQueries'

export default class CourseStudents extends Component {

  render() {

    const { course_id }= this.props.location.state

    return (
    <Query query={COURSE_STUDENT_QUERY} variables={{ courseId: course_id }}>
          {({ loading, error, data }) => {
            if (loading) return <CoursePlaceholder />
            if (error) return <Error {...error}/>

            const courseToRender = data.course

            const students = []
            courseToRender.students.forEach(function(element) {
              const item =  {
                id: element.id,
                firstName:element.firstName,
                lastName:element.lastName,
                percentCorrect: element.answers.filter(a => a.answerCorrect).length / element.answers.length > 0 ? Math.round(element.answers.filter(a => a.answerCorrect).length / element.answers.length *100) : 0.0
              }
              students.push(item)
            });

        return (

      <div className="main">
        <div className="container">
          <CourseHeader {...courseToRender} />
          <StudentCourseList students={students} courseId={course_id} />
          <div >
          </div>
        </div>
      </div>
        )
      }}
    </Query>
    )
  }
}