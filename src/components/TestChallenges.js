import React from 'react';
import '../css/App.css';

import { Card, CardText, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom'

const TestChallenges = (props) =>

  <Card className="smallcard" body>
  <Link to="/challenges"><CardHeader>Challenges</CardHeader></Link>
    <CardText>
    <div>Panel 45</div>
    <div>Roberta Marquez</div>
    </CardText>
  </Card>

export default TestChallenges
