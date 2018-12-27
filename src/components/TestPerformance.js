import React from 'react';
import '../css/App.css';

import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const TestPerformance = (props) =>

<div >
<Segment  secondary attached='top'>
<Link  to={{
pathname: "/student_performance",
state:
{ course_id: props.course.id,
  test_id: props.id }
}} >
Questions
</Link>

</Segment>
<Segment style={{ minHeight: 400 }} attached>
<div><b>Best:</b></div>
<div>Joe 85%</div>
<div>Amy 80%</div>

<div><b>Worst</b></div>
<div>Joe 45%</div>
<div>Amy 40%</div>
</Segment>
</div>

export default TestPerformance
