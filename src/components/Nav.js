import React from 'react';
import '../css/App.css';
import SignInButton from './SignInButton'
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom'

const Nav = (props) =>

  <div className="header">
    <div>
    <Link  to="/teacher_dashboard"><Button outline color="primary">Dashboard</Button></Link>
    </div>
    <div>
    <Link  to="/"><div><Button outline color="primary">Quandria</Button></div></Link>
    </div>
    <div className="sign-button">
    <SignInButton signout={props.signout} authenticated={props.logged_in.authenticated} />
    </div>
  </div>

export default Nav
