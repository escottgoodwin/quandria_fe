import React from 'react';
import '../css/App.css';

const Error =  props =>

        <div className="dashboard">
          <div className="signin">
          <h2>Error</h2>
          <h4>{props.graphQLErrors.length>0 &&
          props.graphQLErrors.map(error => error.message)}
          </h4>
          <h4>{props.networkError.message !== null &&
            props.networkError.message}
          </h4>
          </div>
        </div>

export default Error;
