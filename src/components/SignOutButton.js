import React,{Component} from 'react';
import { Button } from 'reactstrap';
import {withRouter} from "react-router-dom"
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const LOGOUT_MUTATION = gql`
  mutation Logout($userId:ID!){
    logout(userId:$userId){
      authMsg
      user{
        firstName
        lastName
        online
      }
    }
  }
`

class SignOutButton extends Component {



  render() {

    const userid = sessionStorage.getItem('userid');
    const token = sessionStorage.getItem('token');


    return (

      <Mutation
          mutation={LOGOUT_MUTATION}
          variables={{ userId: userid  }}
          onCompleted={data => this._confirm(data)}
        >
          {mutation => (
            Token: {token} <Button outline color='primary' onClick={this.logout}>Sign Out Token</Button>
          )}
        </Mutation>


      )

    }

    logout = () => {
        sessionStorage.setItem('online', 'false');
        browserHistory.push(`/`)
      }

    _confirm = async data => {
        const { user } = data.login
        this._saveUserData(user)
        browserHistory.history.push(`/sign_out`)
      }

    _saveUserData = (user) => {
      sessionStorage.setItem('online', 'false');
    }

  }


export default withRouter(SignOutButton)
