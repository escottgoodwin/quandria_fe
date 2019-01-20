import React from 'react';
import '../css/App.css';
import moment from 'moment'

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
  <div style={{fontSize: '12px',color:'#C0C0C0'}}>
    {moment(props.addedDate).format("dddd, MMMM Do YYYY, h:mm a")}
  </div >
  <hr />
  </div>






export default ChallengeRow
