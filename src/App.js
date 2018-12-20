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
import CourseDashboard from './screens/CourseDashboard'
import AddCourse from './screens/AddCourse'
import EditCourse from './screens/EditCourse'
import TestDashboard from './screens/TestDashboard'
import AddTest from './screens/AddTest'
import EditTest from './screens/EditTest'
import AddPanels from './screens/AddPanels'
import Main from './screens/Main'
import StudentPerformance from './screens/StudentPerformance'
import Challenges from './screens/Challenges'
import SelectPanels from './screens/SelectPanels'
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
          <Route path="/teacher_dashboard" component={TeacherDashboard}/>
          <Route path="/student_dashboard" component={StudentDashboard}/>
          <Route path="/admin_dashboard" component={AdminDashboard}/>
          <Route path="/quandria_dashboard" component={QuandriaDashboard}/>
          <Route path="/course_dashboard" component={CourseDashboard}/>
          <Route path="/add_course" component={AddCourse}/>
          <Route path="/edit_course/" component={EditCourse}/>
          <Route path="/test_dashboard/" component={TestDashboard}/>
          <Route path="/add_test/" component={AddTest}/>
          <Route path="/edit_test/" component={EditTest}/>
          <Route path="/add_panels" component={AddPanels}/>
          <Route path="/select_panels" component={SelectPanels}/>
          <Route path="/student_performance/" component={StudentPerformance}/>
          <Route path="/challenge_dashboard" component={Challenges}/>
        </Switch>
        <Footer />
      </div>
      )
    }
}

export default App
