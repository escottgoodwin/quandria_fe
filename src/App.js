import React,{Component }from 'react';
import { Route, Switch} from 'react-router-dom'
import './css/App.css';

import TeacherDashboard from './screens/TeacherDashboard'
import StudentDashboard from './screens/StudentDashboard'
import AdminDashboard from './screens/AdminDashboard'
import QuandriaDashboard from './screens/QuandriaDashboard'
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
import AddTest from './screens/AddTest'
import EditTest from './screens/EditTest'
import PublishTest from './screens/PublishTest'
import EditPublishTest from './screens/EditPublishTest'
import AddPanels from './screens/AddPanels'
import Main from './screens/Main'
import StudentPerformance from './screens/StudentPerformance'
import ChallengeDashboard2 from './screens/ChallengeDashboard2'

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
          <Route path="/quandria_dashboard" component={QuandriaDashboard}/>
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
          <Route path="/student_performance/" component={StudentPerformance}/>
          <Route path="/challenge_dashboard" component={ChallengeDashboard2}/>
          <Route path="/publish_test" component={PublishTest}/>
          <Route path="/edit_publish_test" component={EditPublishTest}/>

        </Switch>
        <Footer />
      </div>
      )
    }
}

export default App
