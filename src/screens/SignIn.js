import React,{Component} from 'react'
import * as Cookies from "js-cookie"
import '../css/App.css'
//import { Button, Form, FormGroup, Label, Input,} from 'reactstrap'
import { Form, Input, Button, Message } from 'semantic-ui-react'
import { Mutation } from "react-apollo"

import {LOGIN_MUTATION} from '../ApolloQueries'

class SignIn extends Component {

    state = {
      email: '',
      password: '',
      graphQLError: '',
      isVisibleGraph:false,
      networkError:false,
      isVisibleNet:false,
      pushToken:'',
      isVisible:false
    }

    render() {
      const { email, password, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state


      return (
      <div className="main">
      <div className="dashboard">
      <div className="signin">
      <h2>Sign In</h2>

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
          onError={error => this._error (error)}
        >

          {mutation => (
            <Button color='blue' onClick={mutation}>Submit</Button>
          )}
        </Mutation>


        </Form>

        {isVisibleGraph &&
          <Message negative>
            <p><b>{graphQLError}</b></p>
          </Message>
        }

        {isVisibleNet &&
          <Message negative>
            <p><b>{networkError}</b></p>
          </Message>
        }

      </div>
      </div>
      </div>
  )
}

_error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
    this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

    error.networkError &&
      this.setState({ isVisibleNet: true, networkError: error.networkError.message})

}

  _confirm = async data => {
    const { token } = data.login
    const user = data.login.user
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
    sessionStorage.setItem('auth_token', token)
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('userid', user.id)
    sessionStorage.setItem('online', user.online)
    if (user.role === "ADMIN") {
      sessionStorage.setItem('institutionId', user.adminInstitutions[0].id)

    }

    Cookies.set('auth_token', token)
    Cookies.set('user', JSON.stringify(user))
    Cookies.set('userid', user.id)
    Cookies.set('online', user.online)
    if (user.role === "ADMIN") {
      Cookies.set('institutionId', user.adminInstitutions[0].id)

    }



  }

}

export default SignIn
