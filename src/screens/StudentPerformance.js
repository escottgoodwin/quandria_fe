import React from 'react';
import '../css/App.css';
import { Table, Card, Button, Row, Col, } from 'reactstrap';
import {Link} from 'react-router-dom'

const StudentPerformance = () =>
<div className="main">


    <div className="container">

      <h3>Student Performance</h3>
      <Link to="/course_dashboard"><h3>Microbiology - Bio345</h3></Link>
      <Link to="/test_dashboard"><h4>Test 1 Date: 10/1/2018</h4></Link>

      <Link to="/add_panels"><Button color="primary" size="sm">Select Panels</Button></Link>

      <div className="coursecontainer">
      <Row>
        <Col >
          <Card className="card" body>

        <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Questions</th>
          </tr>
        </thead>

        <tbody>
        <tr>
          <td>Mark</td>
          <td>67</td>
        </tr>

        <tr>
          <td>Mr. T</td>
          <td>57</td>
        </tr>

        <tr>
          <td>Royal</td>
          <td>47</td>
        </tr>

        </tbody>
      </Table>
          </Card>
        </Col>

        <Col >
          <Card className="card" body>
          <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Accuracy</th>
          </tr>
        </thead>

        <tbody>
        <tr>
          <td>Mark</td>
          <td>67%</td>
        </tr>
        <tr>
          <td>Mr. T</td>
          <td>57%</td>
        </tr>
        <tr>
          <td>Royal</td>
          <td>47%</td>
        </tr>
        </tbody>
      </Table>
          </Card>
        </Col>

      </Row>
      </div>
    </div>


</div>



export default StudentPerformance ;
