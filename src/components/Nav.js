import React from 'react';
import '../css/App.css';
import SignInButton from './SignInButton'
import DashboardButton from './Dashboard'

import { Button } from 'reactstrap';
import {Link} from 'react-router-dom'

const Nav = (props) =>

  <div className="header">
    <div className="sign-button">
    <DashboardButton />
    </div>
    <div>
    <Link  to="/"><div><Button outline color="primary">Quandria</Button></div></Link>
    </div>
    <div className="sign-button">
    <SignInButton />
    </div>
  </div>

export default Nav
