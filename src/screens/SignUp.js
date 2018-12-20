import React,{Component} from 'react';
import '../css/App.css';
import { Button, Form, FormGroup, Label, Input,} from 'reactstrap';
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
      <div className="dashboard">
      <div className="signin">
      <h2>Sign Up</h2>
      <div>{this.props.login_message}</div>
      <Form>

      <FormGroup >
        <Label for="examplefirstName">First Name</Label>
        <Input
        type="firstName"
        name="firstName"
        onChange={e => this.setState({ firstName: e.target.value })}
        value={firstName}
        placeholder="First Name"
         />
      </FormGroup>
      <FormGroup>
        <Label for="examplelastName">Last Name</Label>
        <Input
        type="lastName"
        name="lastName"
        placeholder="Last Name"
        onChange={e => this.setState({ lastName: e.target.value })}
        value={lastName}  />
      </FormGroup>

        <FormGroup >
          <Label for="exampleEmail">Email</Label>
          <Input
          type="email"
          name="email"
          onChange={e => this.setState({ email: e.target.value })}
          value={email}
          placeholder="Email address"
           />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={e => this.setState({ password: e.target.value })}
          value={password}  />
        </FormGroup>

        <Mutation
            mutation={SIGNUP_MUTATION}
            variables={{ email:email, password:password, firstName: firstName, lastName: lastName }}
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
