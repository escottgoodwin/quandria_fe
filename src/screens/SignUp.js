import React,{Component} from 'react';
import '../css/App.css';
import { Form, Input, Button } from 'semantic-ui-react'
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SIGNUP_MUTATION = gql`
  mutation Signup($firstName: String!,$lastName:String!,$email: String!,$password: String!){
    signup(firstName:$firstName,lastName:$lastName,
    email:$email, password:$password){
      authMsg
      user{
        firstName
        lastName
      }
    }
  }
  `

class SignUp extends Component {
    state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }

    render() {
      const { email, password,firstName,lastName } = this.state

      return (
        <div className="main">
      <div className="dashboard">
      <div className="signin">
      <h2>Sign Up</h2>
      <div>{this.props.login_message}</div>

      <Form size="big">

      <Form.Field
        control={Input}
        label='First Name'
        value={firstName}
        onChange={e => this.setState({ firstName: e.target.value })}
        placeholder='First Name'
      />

      <Form.Field
        control={Input}
        label='Last Name'
        value={lastName}
        type='password'
        onChange={e => this.setState({ lastName: e.target.value })}
        placeholder='Last Name'
      />

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
            mutation={SIGNUP_MUTATION}
            variables={{ email:email, password:password, firstName: firstName, lastName: lastName }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <Button color='blue' onClick={mutation}>Submit</Button>
            )}
          </Mutation>


        </Form>
      </div>
      </div>
        </div>

  )
}

  _confirm = async data => {
    const { authMsg } = data.signup
    this.props.history.push({
      pathname: `/signed_up`,
      state: { authMsg: authMsg }
      })
    }


  _saveUserData = (token, user) => {

  }

}

export default SignUp;
