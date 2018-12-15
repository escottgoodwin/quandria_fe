import React from 'react';
import '../css/App.css';

import { Card, CardText, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom'

const TestPerformance = (props) =>

  <Card className="smallcard" body>
  <Link to="/student_performance"><CardHeader>Student Rankings</CardHeader></Link>

    <CardText>
    <div><b>Best:</b></div>
    <div>Joe 85%</div>
    <div>Amy 80%</div>

    <div><b>Worst</b></div>
    <div>Joe 45%</div>
    <div>Amy 40%</div>
    </CardText>
  </Card>

export default TestPerformance
