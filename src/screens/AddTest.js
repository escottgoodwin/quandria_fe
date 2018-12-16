import React,{Component} from 'react';
import '../css/App.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import AddTestHeader from '../components/AddTestHeader'

class AddTest extends Component {

  constructor(props) {
     super(props);

     const {course_id } = this.props.location.state
      this.state = {
            test_number:'',
            subject:'',
            test_date:'',
            all_questions:false,
            question_ids:[],
            release_date:'',
            class_id:course_id,
            test_message:''
    }
  }

  componentDidMount() {
    const {course_id } = this.props.location.state
    this.props.fetchClass(course_id)

    }

  handleChange = e => {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

    render() {
      return (
  <div className="dashboard">
    <div className="signin">
      <h2>Add Test</h2>

      <AddTestHeader  {...this.props} />
      <h6 style={{color:'green',height:10,padding:5}}>{this.state.test_message}</h6>
      <Form >

        <FormGroup>

          <Label for="exampleSelect">Test Number</Label>
          <Input type="select" name="test_number" onChange={this.handleChange.bind(this)} value={this.state.test_number} >
              <option>Test 1</option>
               <option>Test 2</option>
               <option>Test 3</option>
               <option>Test 4</option>
               <option>Test 5</option>
          </Input>
        </FormGroup>

        <FormGroup >

          <Label for="subject">Subject</Label>
          <Input type="text" name="subject" onChange={this.handleChange} value={this.state.subject} />
        </FormGroup>

        <FormGroup>
          <Label for="testDate">Date</Label>
          <Input type="date" name="test_date" onChange={this.handleChange} value={this.state.test_date}   />
        </FormGroup>

        <Button color='primary' >Submit</Button>
      </Form>
    </div>
  </div>
)
}
}

export default AddTest
