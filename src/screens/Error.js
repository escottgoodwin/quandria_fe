import React from 'react'
import '../css/App.css'
import { Message,Icon } from 'semantic-ui-react'

const Error = props =>

<div className="main">
<div className="coursecontainer">
      {props.error.graphQLErrors.length>0 &&
      <Message negative>
      <div><Icon name='warning sign'  /></div>
      <div>{props.error.graphQLErrors.map(error => error.message)}</div>
      </Message>
      }

      {props.error.networkError !== null &&
      <Message negative>
      <div><Icon name='warning sign' size='large' /></div>
      <div>{props.error.networkError.message}</div>
      </Message>
      }
      </div>
    </div>


export default Error
