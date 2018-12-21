import React,{Component} from 'react';

import '../css/App.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import TeacherHeader from '../components/TeacherHeader'
import CourseList from '../components/CourseList'
import Error from './Error'
import Loading from './Loading'

const COURSE_QUERY = gql`
  query UserQuery($userid: ID!) {
    user(id: $userid){
      id
      firstName
      lastName
      studentCourses{
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
`

class StudentDashboard extends Component {

  render() {
    const userid = sessionStorage.getItem('userid');

    return (

        <Query query={COURSE_QUERY} variables={{ userid: userid }}>
              {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <Error/>

                const userToRender = data.user
                const studentCourses = new Array(userToRender.studentCourses.filter(course => !course.deleted))

                return (
                  <div className="main">

                    <div className="container">
                    <div><h4>Student</h4></div>
                    <TeacherHeader {...userToRender} />

                    <div className="coursecontainer">

                      <CourseList  {...studentCourses} />

                    </div>

                  </div>

                </div>
              )
            }}
          </Query>
    )
  }
}


export default StudentDashboard