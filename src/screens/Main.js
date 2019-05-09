import React from 'react';
import '../css/App.css';

import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';


const Main = () =>
<div className="main">
<main role="main">

    <div className="container_upper">
      <h1 className="display-3">Welcome to Quandrio</h1>
      <p>For study groups and quiz each other with your class materials</p>
    </div>


  <div className="container_lower">

  <Row>
    <Col >
      <Card body>
        <CardTitle>For Students</CardTitle>
        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
        <Button color="primary">Go somewhere</Button>
      </Card>
    </Col>
    <Col >
      <Card body>
        <CardTitle>For Teachers</CardTitle>
        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
        <Button color="primary">Go somewhere</Button>
      </Card>
    </Col>
    <Col >
      <Card body>
        <CardTitle>For Schools</CardTitle>
        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
        <Button color="primary">Go somewhere</Button>
      </Card>
    </Col>
  </Row>


  </div>

</main>
</div>
export default Main
