import React,{Component} from 'react';
import '../css/App.css';
//import { Button } from 'reactstrap';
import { Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'


class DashboardButton extends Component {

  render() {

    const token = sessionStorage.getItem(AUTH_TOKEN);

    return (

    token ?
    <Link to="/teacher_dashboard"> <Button basic color='blue'>Dashboard</Button></Link>
    :
    <Link to="/sign_up"><Button basic color='blue'>Sign Up</Button></Link>

  )
}

}

export default DashboardButton
