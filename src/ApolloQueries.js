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

const PERFORMANCE_CHALLENGE_QUERY = gql`
query TestChallenges($test_id:ID!){
  tests(where:{id:$test_id}){
    tests{
      id
      subject
      testNumber
      testDate
      course{
        id
        name
        courseNumber
      }
      questions{
        id
        question
        addedBy{
          firstName
          lastName
        }
        challenges{
          id
          challenge
          addedBy{
            firstName
            lastName
          }
        }
      }
    }
  }
}
`

const CHALLENGE_QUERY = gql`
query TestChallenges($test_id:ID!){
  test(id:$test_id){
      id
      subject
      testNumber
      testDate
      course{
        id
        name
        courseNumber
      }
      panels{
        link
        id
      }
      }
    }
`
const ADD_TEST_MUTATION = gql`
mutation AddTest(
  $subject:String!
  $testDate: DateTime,
  $testNumber: String,
  $courseId:ID!){
    addTest(subject:$subject,
      testDate:$testDate,
      testNumber:$testNumber,
      courseId:$courseId){
        id
      }
    }
    `

const TEST_COURSE_QUERY = gql`
  query COURSE($course_id:ID!){
    course(id:$course_id){
      name
      courseNumber
      time
      department1
      id
    }
  }
  `


export const COURSE_QUERY = gql`
query UserQuery($userid: ID!) {
  user(id: $userid){
    id
    firstName
    lastName
    teacherCourses{
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

const TEST_QUERY = gql`
query TestQuery($test_id:ID!){
  test(id:$test_id){
      id
      subject
      testNumber
      testDate
      release
      releaseDate
      published
      publishDate
    	course{
        id
        name
        courseNumber
      }
      panels{
        id
    }
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user{
        id
        firstName
        lastName
        online
        role
        institution{
          name
          id
        }
      }
    }
  }
`

const PANEL_QUERY = gql`
query TestChallenges($test_id:ID!){
  test(id:$test_id){
    id
      subject
      testNumber
      testDate
      course{
        id
        name
        courseNumber
      }
      panels{
        link
        questions{
         question
         questionAnswers{
           answerCorrect
         }
        }
      }
   }
}
`
const TEST_STATS_QUERY = gql`
query TestStats($testId:ID!,$courseId:ID!){
  userTestStats(testId:$testId,
  courseId:$courseId){
    name
    totalCorrect
    percentCorrect
    total
  }
}
`

const DELETE_TEST_MUTATION = gql`
  mutation DeleteTest(
    $test_id: ID!,
  ){
    updateTest(
      id: $test_id,
      deleted: true,
    ){
    id
    course{
      id
    }
  }
}
`

const CHALLENGE_TEST_QUERY = gql`
query ChallengeTestQuery($testId:ID!){
  challenges(where:{answer:{question:{test:{id:$testId}}}},orderBy:addedDate_DESC){
    challenges{
      id
      challenge
      addedDate
      addedBy{
        firstName
        lastName
      }
      answer{
        question{
          question
          addedDate
          addedBy{
            firstName
            lastName
          }
        }
      }
    }
  }
}
`

export {
  ADD_COURSE_MUTATION,
  PERFORMANCE_CHALLENGE_QUERY,
  CHALLENGE_QUERY,
  ADD_TEST_MUTATION,
  TEST_COURSE_QUERY,
  DELETE_COURSE_MUTATION,
  LOGIN_MUTATION,
  TEST_QUERY,
  PANEL_QUERY,
  TEST_STATS_QUERY,
  DELETE_TEST_MUTATION,
  CHALLENGE_TEST_QUERY,
}
