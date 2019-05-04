import React,{Component }from 'react';
import { Route, Switch} from 'react-router-dom'
import './css/App.css';

import TeacherDashboard from './screens/TeacherDashboard'
import StudentDashboard from './screens/StudentDashboard'
import AdminDashboard from './screens/AdminDashboard'
import QuandrioDashboard from './screens/QuandrioDashboard'
import SignIn from './screens/SignIn'
import SignOut from './screens/SignOut'
import SignUp from './screens/SignUp'
import SignedUp from './screens/SignedUp'
import SignUpConfirmation from './screens/SignUpConfirmation'
import CourseDashboard from './screens/CourseDashboard'
import StudentCourseDashboard from './screens/StudentCourseDashboard'
import CourseInvitation from './screens/CourseInvitation'
import AddCourse from './screens/AddCourse'
import EditCourse from './screens/EditCourse'
import TestDashboard from './screens/TestDashboard'
import StudentTestDashboard from './screens/StudentTestDashboard'
import TestPanels from './screens/TestPanels'
import StudentTestPanels from './screens/StudentTestPanels'
import AddTest from './screens/AddTest'
import EditTest from './screens/EditTest'
import PublishTest from './screens/PublishTest1'
import EditPublishTest from './screens/EditPublishTest'
import AddPanels from './screens/AddPanels'
import Main from './screens/Main'
import StudentPerformance from './screens/StudentPerformance'
import StudentTestPerformance from './screens/StudentTestPerformance'
import ChallengeDashboard2 from './screens/ChallengeDashboard3'
import CourseStudents from './screens/CourseStudents'
import AddInstitution from './screens/AddInstitution'
import InstitutionDashboard from './screens/InstitutionDashboard'
import AddAdministrator from './screens/AddAdministrator'
import AddTeacherQuandrio from './screens/AddTeacherQuandrio'
import EditInstitution from './screens/EditInstitution'
import EditAdministrator from './screens/EditAdministrator'
import PersonnelDashboard from './screens/PersonnelDashboard'
import InstitutionCourse from './screens/InstitutionCourse'
import InstitutionStudents from './screens/InstitutionStudents'
import ChallengeDashboardStudent from './screens/ChallengeDashboardStudent'


//import CourseDashboard from './screens/CourseDashboard2'

import Nav from './components/Nav'
import Footer from './components/Footer'

// Add the reducer to your store on the `routing` key
class App extends Component {

  render() {

    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route path="/sign_in" component={SignIn}/>
          <Route path="/sign_out" component={SignOut}/>
          <Route path="/sign_up" component={SignUp}/>
          <Route path="/signed_up" component={SignedUp}/>
          <Route path="/confirm/:token/:email" component={SignUpConfirmation}/>
          <Route path="/teacher_dashboard" component={TeacherDashboard}/>
          <Route path="/student_dashboard" component={StudentDashboard}/>
          <Route path="/admin_dashboard" component={AdminDashboard}/>
          <Route path="/quandria_dashboard" component={QuandrioDashboard}/>
          <Route path="/course_dashboard" component={CourseDashboard}/>
          <Route path="/student_course_dashboard" component={StudentCourseDashboard}/>
          <Route path="/add_course" component={AddCourse}/>
          <Route path="/edit_course/" component={EditCourse}/>
          <Route path="/course_invitation/" component={CourseInvitation}/>
          <Route path="/test_dashboard/" component={TestDashboard}/>
          <Route path="/student_test_dashboard/" component={StudentTestDashboard}/>
          <Route path="/add_test/" component={AddTest}/>
          <Route path="/edit_test/" component={EditTest}/>
          <Route path="/add_panels" component={AddPanels}/>
          <Route path="/test_panels" component={TestPanels}/>
          <Route path="/student_test_panels" component={StudentTestPanels}/>
          <Route path="/student_performance/" component={StudentPerformance}/>
          <Route path="/student_test_performance/" component={StudentTestPerformance}/>
          <Route path="/challenge_dashboard" component={ChallengeDashboard2}/>
          <Route path="/publish_test" component={PublishTest}/>
          <Route path="/edit_publish_test" component={EditPublishTest}/>
          <Route path="/course_students" component={CourseStudents}/>
          <Route path="/add_institution" component={AddInstitution}/>
          <Route path="/institution_dashboard" component={InstitutionDashboard}/>
          <Route path="/add_admin" component={AddAdministrator}/>
          <Route path="/add_teacher" component={AddTeacherQuandrio}/>
          <Route path="/edit_admin" component={EditAdministrator}/>
          <Route path="/edit_institution" component={EditInstitution}/>
          <Route path="/personnel_dashboard" component={PersonnelDashboard}/>
          <Route path="/institution_course" component={InstitutionCourse}/>
          <Route path="/institution_students" component={InstitutionStudents}/>
          <Route path="/challenge_student_dashboard" component={ChallengeDashboardStudent}/>

        </Switch>
        <Footer />
      </div>
      )
    }
}

export default App
