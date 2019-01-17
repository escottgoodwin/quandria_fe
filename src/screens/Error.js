import React,{Component} from 'react';
import '../css/App.css';

class Error extends Component {

    render() {

      return (
        <div className="dashboard">
          <div className="signin">
          <h2>Error</h2>
          <h4>{console.log(this.props.error)}</h4>
          </div>
        </div>
      )
    }
  }

export default Error;
