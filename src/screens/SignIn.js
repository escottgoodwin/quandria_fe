import React,{Component} from 'react';
import '../css/App.css';
//import { Button, Form, FormGroup, Label, Input,} from 'reactstrap';
import { Form, Input, Button } from 'semantic-ui-react'
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user{
        id
        firstName
        lastName
        online
        role
        institution{
          name
          id
        }
      }
    }
  }
`

class SignIn extends Component {
    state = {
      email: '',
      password: '',
    }

    render() {
      const { email, password } = this.state

      return (
      <div className="dashboard">
      <div className="signin">
      <h2>Sign In</h2>
      <div>{this.props.login_message}</div>
      <Form size="big">

      <Form.Field
        control={Input}
        label='Email'
        value={email}
        onChange={e => this.setState({ email: e.target.value })}
        placeholder='Login email'
      />

      <Form.Field
        control={Input}
        label='Password'
        value={password}
        type='password'
        onChange={e => this.setState({ password: e.target.value })}
        placeholder='Login password'
      />

        <Mutation
            mutation={LOGIN_MUTATION}
            variables={{ email:email, password:password }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <Button color='blue' onClick={mutation}>Submit</Button>
            )}
          </Mutation>


        </Form>
      </div>
      </div>

  )
}

  _confirm = async data => {
    const { token, user } = data.login
    this._saveUserData(token, user)
    if (user.role === "TEACHER") {
      this.props.history.push(`/teacher_dashboard`)
    }

    if (user.role === "STUDENT") {
      this.props.history.push(`/student_dashboard`)
    }

    if (user.role === "ADMIN") {
      this.props.history.push(`/admin_dashboard`)
    }

    if (user.role === "QUANDRIA") {
      this.props.history.push(`/quandria_dashboard`)
    }

  }

  _saveUserData = (token, user) => {
    sessionStorage.setItem('auth_token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('userid', user.id);
    sessionStorage.setItem('online', user.online);
  }

}

export default SignIn;
