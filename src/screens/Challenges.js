import React from 'react';
import '../css/App.css';
import { Table, Card,  Row, Col,} from 'reactstrap';
import {Link} from 'react-router-dom'

const Challenges = () =>
<div className="main">


    <div className="container">

      <h3>Challenges</h3>
      <Link to="/course_dashboard"><h3>Microbiology - Bio345</h3></Link>
      <Link to="/test_dashboard"><h4>Test 1 Date: 10/1/2018</h4></Link>


      <div className="coursecontainer">
      <Row>
        <Col >
          <Card className="card" body>
          <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Challenge</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>What does resolution measure</td>
            <td>Image size</td>
            <td>No, it measures the detail of image</td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>What was resolution measure</td>
            <td>Image size</td>
            <td>No, it measures the detail of image</td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>What was resolution measure</td>
            <td>Image size</td>
            <td>No, it measures the detail of image</td>
          </tr>
        </tbody>
      </Table>
          </Card>
        </Col>


      </Row>
      </div>
    </div>


</div>



export default Challenges ;
