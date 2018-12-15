import React,{Component} from 'react';
import '../css/App.css';

import CourseHeader from '../components/CourseHeader'
import TestList from '../components/TestList'
import { Query } from "react-apollo";
import gql from "graphql-tag";

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

class CourseDashboard extends Component {

  render() {

    const { course_id }= this.props.location.state

    return (
    <Query query={COURSE_QUERY} variables={{ courseid: course_id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />
            if (error) return <Error/>

            const courseToRender = data.course
        return (

      <div className="main">

          <div className="container">

            <CourseHeader {...courseToRender} />

            <div className="coursecontainer">

              <TestList {...courseToRender} />

            </div>

          </div>

      </div>
        )
      }}
    </Query>
    )
  }
}


export default CourseDashboard
