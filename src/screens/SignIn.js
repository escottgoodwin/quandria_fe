import React,{Component} from 'react';
import '../css/App.css';
import { Button, Form, FormGroup, Label, Input,} from 'reactstrap';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { AUTH_TOKEN } from '../constants'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user{
        id
        firstName
        lastName
        online
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
      <Form>
        <FormGroup >
          <Label for="exampleEmail">Email</Label>
          <Input
          type="email"
          name="email"
          onChange={e => this.setState({ email: e.target.value })}
          value={email}
          placeholder="Your email address"
           />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
          type="password"
          name="password"
          placeholder="Your password"
          onChange={e => this.setState({ password: e.target.value })}
          value={password}  />
        </FormGroup>

        <Mutation
            mutation={LOGIN_MUTATION}
            variables={{ email:email, password:password }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <Button color='primary' onClick={mutation}>Submit</Button>
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
    this.props.history.push(`/teacher_dashboard`)
  }

  _saveUserData = (token, user) => {
    sessionStorage.setItem(AUTH_TOKEN, token);
    sessionStorage.setItem('userid', user.id);
    sessionStorage.setItem('online', user.online);
  }

}

export default SignIn;
