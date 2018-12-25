import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import {withRouter} from "react-router-dom"
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const LOGOUT_MUTATION = gql`
  mutation {
    logout{
      authMsg
      user{
        online
        firstName
        lastName
      }
    }
  }
`

class SignInButton extends Component {

  render() {

    const userid = sessionStorage.getItem('userid');
    const token = sessionStorage.getItem('auth_token');

    return (

    token ?

      <Mutation
          mutation={LOGOUT_MUTATION}
          variables={{ userId:userid }}
          onCompleted={data => this._confirm(data)}
        >
          {mutation => (
            <Button basic color='blue' onClick={mutation}>Sign Out</Button>
          )}
        </Mutation>

          :
          <Link to="/sign_in"><Button basic color='blue'>Sign In</Button></Link>
        )

    }

    _confirm = (data) => {
      const { user, authMsg } = data.logout
      sessionStorage.removeItem('userid');
      sessionStorage.removeItem('auth_token');
      sessionStorage.setItem('online', user.online);
      this.props.history.push({
        pathname: `/sign_out`,
        state: { authMsg: authMsg }
        })
      }

  }

export default withRouter(SignInButton)
