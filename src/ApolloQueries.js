import gql from "graphql-tag";


export const ADD_COURSE_MUTATION = gql`
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
    id
    name
    time
    deleted
    institution{
      id
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
`

export const TEST_CHALLENGE_QUERY = gql`
query TestChallenges($testId:ID!){
  test(id:$testId){
      id
      subject
      testNumber
      testDate
      course{
        id
        name
        courseNumber
      }
    }
  }
`

export const CHALLENGE_DASHBOARD_QUERY = gql`
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
      questions{
        id
        challenges{
          id
          challenge
          addedBy{
            id
            firstName
            lastName
          }
          challengeMessages{
            id
            challengeMessage
            addedDate
            addedBy{
              id
              firstName
              lastName
            }
          }
          question{
            id
            question
            choices{
              id
              correct
              choice
            }
						questionAnswers{
              id
              addedBy{
                id
                firstName
              }
              answer{
                id
                choice
              }
            }
            panel{
              id
              link
            }
            addedBy{
              id
              firstName
              lastName
            }
          }

        }
      }

    }
}
`


export const CHALLENGE_DASHBOARD2_QUERY = gql`
query ChallengeTestQuery($testId:ID!){
  challenges(where:{answer:{question:{test:{id:$testId}}}},orderBy:addedDate_DESC){
    challenges{
      id
      challenge
      addedDate
      addedBy{
        id
        firstName
        lastName
      }
      answer{
        id
        answer{
          choice
        }
        question{
          id
          question
          addedDate
          addedBy{
            id
            firstName
            lastName
          }
          choices{
            id
            choice
          }
        }
      }
      answer{
        id
        question{
          id
          panel{
            id
            link
          }
          question
          addedDate
          addedBy{
            id
            firstName
            lastName
          }
        }
      }
    }
  }
}
`

export const NEW_PANEL_SUBSCRIPTION = gql`
subscription NewPanelSubscription($testId:ID!){
  newPanel(testId:$testId){
    id
    panelLink
    total
    totalCorrect
    percentCorrect
    question
  }
}
`

export const CHALLENGE_MESSAGE_SUBSCRIPTION = gql`
  subscription ChallengeMsgSub($challengeId:ID!){
    challengeMsg(challengeId:$challengeId){
      node{
        id
        challengeMessage
        addedDate
        addedBy{
          id
          firstName
          lastName
        }
      }
    }
  }
  `

export const PERFORMANCE_CHALLENGE_QUERY = gql`
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

export const CHALLENGE_QUERY = gql`
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
export const ADD_TEST_MUTATION = gql`
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

export const TEST_COURSE_QUERY = gql`
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
  query CourseQuery($courseid:ID!){
    course(id:$courseid){
      id
      name
      courseNumber
      time
      institution{
        id
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

export const EDIT_COURSE_MUTATION = gql`
  mutation UpdateCourse(
    $name: String!,
    $time:String,
    $courseNumber: String,
    $department1: String
    $id:ID!
  ){
    updateCourse(
      name: $name,
      time: $time,
      courseNumber: $courseNumber,
      department1: $department1
      id:$id
    ){
    name
    time
    courseNumber
    department1
    id
  }
}
`

export const TEST_COURSE_MUTATION = gql`
  mutation UpdateTest(
    $subject: String!,
    $testDate:DateTime,
    $testNumber: String,
    $id:ID!
  ){
    updateTest(
      subject: $subject,
      testDate: $testDate,
      testNumber: $testNumber
      id:$id
    ){
    id
    subject
    testNumber
    testDate
  }
}
`

export const SEND_INVITES_MUTATION = gql`
mutation SendInvites($emails:String,$course_id:ID!){
  sendInvite(emails:$emails,
    courseId:$course_id){
      authMsg
    }
}
`

export const COURSE_DASHBOARD_QUERY = gql`
query CourseQuery($courseid:ID!){
  course(id:$courseid){
    id
    name
    courseNumber
    time
    institution{
      id
      name
    }
    students{
      id
    }
    tests{
      id
      subject
      deleted
      testNumber
      release
      testDate
      course{
        id
        name
        courseNumber
      }
      questions{
        id
        questionAnswers{
          id
          challenge{
            id
            challenge
          }
        answer{
          id
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

export const TEACHER_DASHBOARD_QUERY = gql`
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
        id
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

export const STUDENT_COURSE_QUERY = gql`
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
          id
          firstName
          lastName
        }
        institution{
          id
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
        id
        name
      }
      teachers{
        id
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

export const DELETE_COURSE_MUTATION = gql`
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

export const TEST_EDIT_QUERY = gql`
  query TestQuery($test_id: ID!){
    test(id:$test_id){
      subject
      testDate
      testNumber
      id
      course {
        id
        name
        courseNumber
      }
  }
}
`

export const TEST_QUERY = gql`
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

export const LOGIN_MUTATION = gql`
mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user{
      id
      firstName
      lastName
      online
      role
      teacherInstitutions {
        id
        name
      }
      studentInstitutions {
        id
        name
      }
      institution{
        name
        id
      }
    }
  }
}
`

export const CONFIRMATION_MUTATION = gql`
  mutation ConfirmEmail($email:String!, $confirmationToken:String!){
    confirmEmail(email:$email,confirmationToken:$confirmationToken){
      authMsg
    }
  }
  `

export const PANEL_QUERY = gql`
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
        id
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
export const TEST_STATS_QUERY = gql`
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

export const DELETE_TEST_MUTATION = gql`
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

export const CHALLENGE_TEST_QUERY = gql`
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

export const LOGOUT_MUTATION = gql`
  mutation {
    logout{
      authMsg
      user{
        online
        firstName
        lastName
      }
    }
  }
`

export const ADD_PANEL_MUTATION = gql`
mutation AddPanel($testId:ID!, $link:String!){
  addPanel(link:$link, testId:$testId){
    link
    id
    test{
      panels{
        id
        link
      }
    }
  }
}
  `

export const ADD_PANELS_MUTATION = gql`
  mutation AddPanels( $testId: ID!, $uploadsList: String! ){
    addPanels( uploadsList: $uploadsList, testId: $testId ){
        link
        id
        test{
          panels{
            id
            link
            }
          }
        }
      }
    `

export const PHOTO_LABEL_MUTATION = gql`
  mutation SendLink($testId:ID!, $link:String!, $label: String){
    addLabeledPhoto(link:$link, testId:$testId, label: $label){
      link
      id
      test{
        id
      }
    }
  }
  `

  export const TEST_QUESTION_STATS_QUERY = gql`
  query TestQuestionStats($testId:ID!){
    testQuestionStats(testId: $testId){
      question
      total
      totalCorrect
      percentCorrect
  }
  }
  `

export const USER_TEST_STATS_QUERY = gql`
query TestStats($testId:ID!, $courseId:ID!){
  userTestStats(testId: $testId,
  courseId: $courseId){
    name
    totalCorrect
    percentCorrect
    total
  }
}
`

export const TEST_STATS_PERFORMANCE_QUERY = gql`
query TestStats($testId:ID!){
  testStats(testId:$testId){
    total
    totalCorrect
    percentCorrect
  }
}
`

export const TEST_PANEL_STATS_QUERY = gql`
query PanelQuery($testId:ID!){
  testPanelStats(testId:$testId){
      id
      panelLink
      total
      totalCorrect
    	percentCorrect
      question
    }
  }
`

export const DELETE_PANEL = gql`
mutation DeletePanel($panelId:ID!){
  deletePanel(id:$panelId){
    id
  }
}
`

export const CHALLENGE_MESSAGE_QUERY = gql`
query ChallengeMessages($challengeId:ID!){
   challengeMessages(where:{challenge:{id:$challengeId}}){
    challengeMessages{
      id
      challengeMessage
      addedDate
      addedBy{
        id
        firstName
        lastName
      }
    }
  }
}
`

export const ADD_CHALLENGE_MESSAGE_MUTATION = gql`
mutation AddChallengeMessage($challengeId: ID!, $challengeMessage: String!) {
  addChallengeMessage(challengeMessage: $challengeMessage,
  challengeId: $challengeId){
    addedBy{
      firstName
    }
    challengeMessage
    challenge{
      answer{
        answer{
          choice
        }
      }
    }
  }
}
`

export const USER_INSTITUTION_QUERY = gql`
query UserInstition($userid:ID!){
user(id:$userid){
  teacherInstitution{
    id
    name
  }
}
}
`

export const RELEASE_QUESTIONS_MUTATION = gql`
  mutation ReleaseQuestions(
    $test_id: ID!
    $releaseDate: DateTime
  ){
    updateTest(
      id: $test_id,
      release:true,
      releaseDate: $releaseDate
    ){
    id
    course {
      id
    }
  }
}
`

export const PANEL_COUNT_SUBSCRIPTION = gql`
subscription PanelCountSubscription($testId:ID!){
	panelCount(testId:$testId){
    count
  }
}
`

export const PANEL_COUNT_QUERY = gql`
query PanelCountQuery($testId:ID!){
  panels(where:{test:{id:$testId}}){
    count
  }
}
`

export const QUESTION_COUNT_SUBSCRIPTION = gql`
subscription QuestionCountSubscription($testId:ID!){
	questionCount(testId:$testId){
    count
  }
}
`

export const QUESTION_COUNT_QUERY = gql`
query QuestionCountQuery($testId:ID!){
  questions(where:{test:{id:$testId}}){
    count
  }
}
`

export const ANSWER_COUNT_QUERY = gql`
query AnswerCountQuery($testId:ID!){
  answers(where:{question:{test:{id:$testId}}}){
    count
    answers{
      answer{
        correct
      }
    }
  }
}
`

export const CHALLENGE_COUNT_SUBSCRIPTION = gql`
subscription ChallengeCountSubscription($testId:ID!){
	challengeCount(testId:$testId){
    count
  }
}
`

export const CHALLENGE_COUNT_QUERY = gql`
query ChallengeCountQuery($testId:ID!){
  challenges(where:{answer:{question:{test:{id:$testId}}}}){
    count
  }
}
`

export const ANSWER_STATS_SUBSCRIPTION = gql`
subscription AnswerStats($testId:ID!){
  answerCount(testId:$testId){
    total
    totalCorrect
    percentCorrect
  }
}
`

export const COURSE_STUDENT_QUERY = gql`
query CourseStudentsQuery($courseId:ID!){
  course(id:$courseId){
    id
    name
    courseNumber
    time
    students{
      id
      firstName
      lastName
      answers{
        answerCorrect
        }
      }
    }
  }
`

export const NEW_COURSE_DASHBOARD_QUERY = gql`
query CourseDashboardQuery($courseId:ID!){
  courseDashboard(courseId:$courseId){
    id
    name
    courseNumber
    time
    deleted
    studentCount
    testCount
    courseTestList{
      id
      deleted
      subject
      testDate
      testNumber
      release
      releaseDate
      published
      publishDate
      panelsCount
      questionsCount
      accuracy
      answersCount
      challengeCount
    }
  }
}
`
