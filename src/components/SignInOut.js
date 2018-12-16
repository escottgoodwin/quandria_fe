import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'reactstrap';
import SignOutButton from './screens/SignOutButton'
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class SignInOut extends Component {

  render() {
    const online = sessionStorage.getItem('online');
    const userid = sessionStorage.getItem('userid');
    const token = sessionStorage.getItem('token');

    return (

    JSON.parse(online) ?
      <SignOutButton />
        :
      <Link to="/sign_in"><Button outline color="primary">Sign In</Button></Link>
      )

    }

  }

export default SignInOut
