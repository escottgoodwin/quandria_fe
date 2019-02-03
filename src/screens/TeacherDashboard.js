import React,{Component} from 'react';
import {COURSE_QUERY} from '../ApolloQueries';
import '../css/App.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import TeacherHeader from '../components/TeacherHeader'
import CourseList from '../components/CourseList'
import MainPlaceholder from './MainPlaceholder'

import Error from './Error'

class TeacherDashboard extends Component {

  render() {

    const userid = sessionStorage.getItem('userid');

    return (

        <Query query={COURSE_QUERY} variables={{ userid: userid }}>
              {({ loading, error, data }) => {
                if (loading) return <MainPlaceholder />
                if (error) return <Error error={error} />

                const userToRender = data.user
                const teacherCourses = new Array(userToRender.teacherCourses.filter(course => !course.deleted))

                return (
                  <div className="main">

                    <div className="container">

                      <TeacherHeader {...userToRender} />

                    <div className="coursecontainer">

                      <CourseList  {...teacherCourses} />

                    </div>

                  </div>

                </div>
              )
            }}
          </Query>
    )
  }
}


export default TeacherDashboard
