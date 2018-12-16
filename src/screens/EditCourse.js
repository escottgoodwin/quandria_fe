import React,{Component} from 'react';
import '../css/App.css';
import { Button, Form, FormGroup, Label, Input, } from 'reactstrap';


import EditCourseHeader from '../components/EditCourseHeader'

class EditCourse extends Component {

    constructor(props) {
       super(props);

       this.handleChange = this.handleChange

        this.state = {
              name:'',
              school_id:'',
              time:'',
              class_message:''
      }
    }

    componentDidMount() {

      this.setState({
        name:'',
        school_id:'',
        time:'',
        course_id:'',
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
            <h2>Edit Course</h2>

            <EditCourseHeader {...this.props }/>

            <h6 style={{color:'green',height:10,padding:5}}>{this.state.class_message}</h6>
            <Form >

              <FormGroup >
                <Label for="course_name">Course Name</Label>
                <Input type="text" name="name" onChange={this.handleChange.bind(this)} value={this.state.name} />
              </FormGroup>

              <FormGroup >
                <Label for="course_id">Course ID</Label>
                <Input type="text" name="school_id" onChange={this.handleChange.bind(this)} value={this.state.school_id} />
              </FormGroup>

              <FormGroup >
                <Label for="course_time">Course Time</Label>
                <Input type="text" name="time" onChange={this.handleChange.bind(this)} value={this.state.time} />
              </FormGroup>

              <Button color='primary' >Submit</Button>
              </Form>
            </div>
        </div>
      )
    }
  }

export default EditCourse;
