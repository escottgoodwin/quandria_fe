import React from 'react';
import '../css/App.css';

import ChallengeRow from './ChallengeRow'

const ChallengeList = (props) =>

  <div >
  {
  Object.values(props).slice(0,4).map(challenge => <ChallengeRow key={challenge.id} {...challenge} /> )
  }
  </div>
export default ChallengeList
