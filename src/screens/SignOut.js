import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import {withRouter} from "react-router-dom"
import '../css/App.css';

const divStyle = {
  padding: '20px',
};

class SignOut extends Component {

    render() {

      return (
      <div className="dashboard">
      <div className="signin">
      <div style={divStyle}>
      <h2>{this.props.location.state.authMsg}</h2>
      </div>
      <div style={divStyle}>
      <h4 >Sign in again:</h4>
      </div>
      <div style={divStyle}>
      <h4 ><Link to="/sign_in"><Button color='blue'>Sign In</Button></Link></h4>
      </div>
      </div>
      </div>

  )
}
}


export default withRouter(SignOut) ;
