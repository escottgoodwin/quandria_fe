import React from 'react';
import '../css/App.css';


const ChallengeRow = (props) =>


<div >
  <div >
    <b>Challenge:</b>
    {props.challenges[0].challenge} by {props.challenges[0].addedBy.firstName} {props.challenges[0].addedBy.lastName}

    </div >



      <div>
      <b>Question:</b>
        {props.question} by {props.addedBy.firstName} {props.addedBy.lastName}
      </div>
      <hr />
      </div>






export default ChallengeRow
