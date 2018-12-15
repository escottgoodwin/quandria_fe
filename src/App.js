import React,{Component }from 'react';
import { Provider,connect } from 'react-redux';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import './css/App.css';

import TeacherDashboard from './screens/TeacherDashboard'
import SignIn from './screens/SignIn'
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
import store from './store'

import { login, logout } from './actions/loginActions';

// Add the reducer to your store on the `routing` key


class App extends Component {

  signOut = () => {
    this.props.logout()

    this.props.history.push("/sign_in");
    console.log('sign out')
  }

  render() {
    return (
    <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <Nav signout={this.signOut} logged_in={this.props.logged_in}/>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route path="/sign_in" component={SignIn}/>
          <Route path="/teacher_dashboard" component={TeacherDashboard}/>
          <Route path="/course_dashboard" component={CourseDashboard}/>
          <Route path="/add_course" component={AddCourse}/>
          <Route path="/edit_course/" component={EditCourse}/>
          <Route path="/test_dashboard/" component={TestDashboard}/>
          <Route path="/add_test/" component={AddTest}/>
          <Route path="/edit_test/" component={EditTest}/>
          <Route path="/add_panels" component={AddPanels}/>
          <Route path="/select_panels" component={SelectPanels}/>
          <Route path="/student_performance/" component={StudentPerformance}/>
          <Route path="/challenges" component={Challenges}/>
        </Switch>
        <Footer />
      </div>

      </BrowserRouter>
  </Provider>
      )
    }
}

const mapStateToProps = state => ({
  logged_in: state.login,
})

const mapDispatchToProps = (dispatch) => {
    return {
        login : () => dispatch(login()),
        logout : () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
