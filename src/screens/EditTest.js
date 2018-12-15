import React,{Component} from 'react';
import { connect } from 'react-redux';
import '../css/App.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import EditTestHeader from '../components/EditTestHeader'

import { editTest,fetchTest } from '../actions/testActions';
import { fetchClass } from '../actions/classActions';

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
    const { test_id,course_id }= this.props.location.state
    this.props.fetchClass(course_id)
    this.props.fetchTest(test_id)

    this.setState({
      test_number:this.props.edit_test.test_number,
      subjects:this.props.edit_test.Subjects,
      test_date: this.props.edit_test.edit_test_date,
      class_id:course_id,
      test_id:test_id

    })
  }

  handleChange = e => {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  editTest = ( ) => {

    const editTest = {
      test_id:this.state.test_id,
      data: {
        test_number:this.state.test_number,
        Subjects:this.state.subjects,
        test_date: new Date(this.state.test_date),
      }
    }
    console.log(editTest)

    this.props.editTest(editTest)
    this.setState({test_message:"Test Updated!"})

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

const mapStateToProps = state => ({
  edit_test: state.test.test,
  test: state.test,
  course: state.course.sel_course
  })

const mapDispatchToProps = (dispatch) => {
    return {
        fetchClass : (course_id) => dispatch(fetchClass(course_id)),
        fetchTest : (newTest) => dispatch(fetchTest(newTest)),
        editTest : (test_id) => dispatch(editTest(test_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTest)
