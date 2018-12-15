import React,{Component} from 'react';
import { connect } from 'react-redux';
import '../css/App.css';
import { Button, Form, FormGroup, Label, Input, } from 'reactstrap';

import { addClass } from '../actions/classActions';

class AddCourse extends Component {

    constructor(props) {
       super(props);

        this.state = {
              institution_id:'PrjYvEVZ2OHiPg6ols3z',
              name:'',
              qpanels:[],
              school_id:'',
              student_ids:[],
              teacher_id:1,
              time:'',
              course_message:''
      }
    }

    handleChange = e => {
      let change = {}
      change[e.target.name] = e.target.value
      this.setState(change)
    }

    newCourse = ( ) => {

      const newClass = {
        institution_id:this.state.institution_id,
        name:this.state.name,
        qpanels:[],
        school_id:this.state.school_id,
        student_ids:[],
        teacher_id:1,
        time:this.state.time
        }
        this.props.addClass(newClass)
        this.setState({course_message:'Course Added!'})
    }

render() {
  return (
        <div className="dashboard">
          <div className="signin">
            <h2>Add Course</h2>
            <h6 style={{color:'green',height:10,padding:5}}>{this.state.course_message}</h6>
            <Form >

              <FormGroup >
                <Label for="course_name">Course Name</Label>
                <Input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
              </FormGroup>

              <FormGroup >
                <Label for="course_id">Course ID</Label>
                <Input type="text" name="school_id" onChange={this.handleChange} value={this.state.school_id} />
              </FormGroup>

              <FormGroup >
                <Label for="course_time">Course Time</Label>
                <Input type="text" name="time" onChange={this.handleChange} value={this.state.time} />
              </FormGroup>

              <Button color='primary' onClick={this.newCourse}>Submit</Button>
              </Form>
            </div>
        </div>
      )
    }
  }

const mapStateToProps = state => ({
  course: state.course.sel_course
  })

const mapDispatchToProps = (dispatch) => {
    return {
        addClass : (newClass) => dispatch(addClass(newClass))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse) ;
