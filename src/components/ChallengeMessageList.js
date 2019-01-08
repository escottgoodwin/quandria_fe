import React,{Component} from 'react';
import '../css/App.css';
import { Comment } from 'semantic-ui-react'

import ChallengeMessageRow from './ChallengeMessageRow'


class ChallengeMessageList extends Component {

  componentDidMount() {
    this.props.subscribeToNewChallengeMessage();
  }


render() {

return (
  <Comment.Group size='small' style={{ overflow: 'auto', height: 375, textAlign:"left", paddingLeft:'20px'}}>
    {this.props.challengeMessages.map(challengeMessage =>
    <ChallengeMessageRow key={challengeMessage.id} {...challengeMessage} />)}

  </Comment.Group>

)
}
}




export default ChallengeMessageList
