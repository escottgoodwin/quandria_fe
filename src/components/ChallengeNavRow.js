import React from 'react';
import '../css/App.css';
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const ChallengeNavRow = (props) =>
<Table.Row>
<Table.Cell>
<div >

<Link  to={{
pathname: "/challenge_panel",
state:
{ challenge_id: props.id }
}} >
  <div >
    <b>Challenge:</b>
    {props.challenge} by {props.addedBy.firstName} {props.addedBy.lastName}
  </div >
</Link>

  <div >
  <b>Question:</b>
    {props.answer.question.question} by {props.answer.question.addedBy.firstName} {props.answer.question.addedBy.lastName}
  </div>
  <div style={{fontSize: '12px',color:'#C0C0C0'}}>
    {moment(props.addedDate).format("dddd, MMMM Do YYYY, h:mm a")}
  </div >
  <hr />
  </div>
  </Table.Cell>
  </Table.Row>
export default ChallengeNavRow
