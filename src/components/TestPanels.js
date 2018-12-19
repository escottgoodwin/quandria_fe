import React from 'react';
import '../css/App.css';

import { Card, CardText, CardHeader,Button } from 'reactstrap';
import { Link } from 'react-router-dom'

const TestPanels = (props) =>

  <Card className="smallcard" body>

  <Link  to={{
    pathname: "/select_panels",
    state:
      {
        test_id: props.id }
    }} >
     <CardHeader>{props.panels.length} Panels</CardHeader>
    </Link>

    <CardText>
    <div>Panel 45 5%</div>
    <div>Panel 35 8%</div>

    <Link  to={{
      pathname: "/panels",
      state:
        {
          test_id: props.id }
      }} >
      <Button style={{margin:10}}size="sm" color='primary' >Add/Remove Panels</Button>
      </Link>

    </CardText>

  </Card>

export default TestPanels
