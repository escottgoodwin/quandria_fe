import React,{Component} from 'react';

import '../css/App.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import InvitationList from '../components/InvitationList'
import StudentCourseList from '../components/StudentCourseList'


import Error from './Error'
import Loading from './Loading'

const COURSE_QUERY = gql`
query UserQuery($userid: ID!) {
  user(id: $userid){
    id
    firstName
    lastName
    invitesSentTo{
      id
      course{
        id
        courseNumber
        name
        time
        teachers{
          firstName
          lastName
        }
        institution{
          name
        }
      }
    }
    studentCourses{
      id
      name
      time
      deleted
      institution{
        name
      }
      teachers{
        firstName
        lastName
      }
      tests{
        id
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
                if (error) return <Error error={error} />

                const userToRender = data.user
                const studentCourses = new Array(userToRender.studentCourses.filter(course => !course.deleted))

                return (
                  <div className="main">

                    <div className="container">

                    <div>
                    <h3>{userToRender.firstName} {userToRender.lastName}'s Courses</h3>
                    <div style={{padding:"15px"}}>

                    </div>

                    <div className="coursecontainer">

                      <StudentCourseList  {...studentCourses} />

                    </div>
                    {userToRender.invitesSentTo.length>0 &&
                      <div>
                    <div><h4>Course Inivitations</h4></div>

                    <InvitationList userid={userToRender.id} {...userToRender}/>
                    </div>
                    }

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
