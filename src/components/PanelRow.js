import React from 'react';
import '../css/App.css';
import { Image, Card } from 'semantic-ui-react'

const PanelRow = (props) =>

<Card  >
<Image src={props.link} />
<Card.Content>
<Card.Description><b>Questions:</b> {props.questions.length} <b>Correct:</b> {props.questions.length>0 ? props.questions.filter(answer => answer.questionAnswers.answerCorrect).length / props.questions.length : 0}%</Card.Description>
</Card.Content>
</Card>

export default PanelRow
