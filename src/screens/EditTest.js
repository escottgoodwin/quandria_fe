import React,{Component} from 'react';
import '../css/App.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import EditTestHeader from '../components/EditTestHeader'


class EditTest extends Component {

  constructor(props) {
     super(props);

     this.handleChange = this.handleChange

      this.state = {
            test_number:'',
            subjects:'',
            test_date:'',
            class_id:'',
            test_id:'',
            test_message:''
    }
  }

  componentDidMount() {

    this.setState({
      test_number:'',
      subjects:'',
      test_date: '',
      class_id:'',
      test_id:'',

    })
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
      <h2>Edit Test</h2>

      <EditTestHeader  {...this.props} />

      <div>
        <h6 style={{color:'green',padding:5,height:10}}>{this.state.test_message}</h6>
      </div>


      <Form >

        <FormGroup>

          <Label for="exampleSelect">Test Number</Label>
          <Input type="select" name="test_number" id="exampleSelect"  onChange={this.handleChange.bind(this)} value={this.state.test_number} >
              <option>Test 1</option>
               <option>Test 2</option>
               <option>Test 3</option>
               <option>Test 4</option>
               <option>Test 5</option>
          </Input>
        </FormGroup>

        <FormGroup >

          <Label for="subject">Subject</Label>
          <Input type="text" name="subjects" onChange={this.handleChange.bind(this)} value={this.state.subjects} />
        </FormGroup>

        <FormGroup>
          <Label for="testDate">Date</Label>
          <Input type="date" name="test_date" onChange={this.handleChange.bind(this)} value={this.state.test_date}   />
        </FormGroup>

        <Button color='primary' onClick={this.editTest}>Submit</Button>
      </Form>
    </div>
  </div>
)
}
}




export default EditTest
