import React from 'react';
import '../css/App.css';

import ChallengeRow from './ChallengeRow'

const ChallengeList = (props) =>
  <div className="coursecontainer">
  {props[0].map(question =>
    <ChallengeRow key={question.id} {...question} />
    )}
  </div>

export default ChallengeList
