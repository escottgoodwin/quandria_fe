import React from 'react';
import '../css/App.css';
import { Comment, List } from 'semantic-ui-react'

import ChallengeMessageRow from './ChallengeMessageRow'

const ChallengeMessageList = (props) =>


  <Comment.Group size='small' style={{ overflow: 'auto', height: 375, textAlign:"left", paddingLeft:'20px'}}>
  {
    props.challengeMessages.map(challengeMessage =>
    <ChallengeMessageRow key={challengeMessage.id} {...challengeMessage} />
  )}

    </Comment.Group>



export default ChallengeMessageList
