import React,{Component} from 'react';
import '../css/App.css';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'


class DashboardButton extends Component {

  render() {

    const token = sessionStorage.getItem(AUTH_TOKEN);

    return (

    token ?
    <Link to="/teacher_dashboard"><Button outline color="primary">Dashboard</Button></Link>
    :
    <Link to="/sign_up"><Button outline color="primary">Sign Up</Button></Link>

  )
}

}

export default DashboardButton
