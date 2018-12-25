import React from 'react';
import '../css/App.css';


const ChallengeRow = (props) =>


<div >
  <div >
    <b>Challenge:</b>
    {props.challenge} by {props.addedBy.firstName} {props.addedBy.lastName}

    </div >



  <div >
  <b>Question:</b>
    {props.question.question} by {props.question.addedBy.firstName} {props.question.addedBy.lastName}
  </div>
  <hr />
  </div>






export default ChallengeRow
