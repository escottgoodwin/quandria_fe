import React from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'reactstrap';

const SignInButton = (props) =>

  props.authenticated ?
    <Button outline color="primary" onClick={props.signout} >Sign Out</Button>
    :
    <Link  to="/sign_in"><Button outline color="primary">Sign In</Button></Link>



export default SignInButton
