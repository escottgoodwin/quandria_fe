import React,{Component} from 'react';
import '../css/App.css';
//import { Button } from 'reactstrap';
import { Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class DashboardButton extends Component {

  navSwitch = (role) => {
    switch (role) {
      case 'TEACHER':
        return <Link to="/teacher_dashboard"> <Button size='large' basic color='blue'>Dashboard</Button></Link>
      case 'STUDENT':
      return <Link to="/student_dashboard"> <Button size='large' basic color='blue'>Dashboard</Button></Link>
      case 'ADMIN':
        return <Link to="/admin_dashboard"> <Button size='large' basic color='blue'>Dashboard</Button></Link>
      case 'QUANDRIA':
          return <Link to="/quandria_dashboard"> <Button size='large' basic color='blue'>Dashboard</Button></Link>
      default:
        return <Link to="/sign_up"><Button basic color='blue'>Sign Up</Button></Link>
    }
  }

  render() {

    return (
      <>
      {this.navSwitch(JSON.parse(sessionStorage.getItem('user')).role)}
      </>
    )




}
}

export default DashboardButton
