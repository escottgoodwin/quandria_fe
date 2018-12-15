import React,{Component} from 'react';
import { connect } from 'react-redux';
import '../css/App.css';
import { Button, Form, FormGroup, Label, Input, } from 'reactstrap';

import { fetchClass,editClass } from '../actions/classActions';

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
      const { course_id } = this.props.location.state
      this.props.fetchClass(course_id)
      this.setState({
        name:this.props.course.sel_course.name,
        school_id:this.props.course.sel_course.school_id,
        time:this.props.course.sel_course.time,
        course_id:course_id
      })
      console.log(this.props)
      }

    handleChange = e => {
      let change = {}
      change[e.target.name] = e.target.value
      this.setState(change)
    }

    editCourse = ( ) => {

      const editClass = {
        class_id:this.state.course_id,
        data:{
        name:this.state.name,
        school_id:this.state.school_id,
        time:this.state.time
        }
        }
      this.props.editClass(editClass)
      this.setState({class_message:"Class Updated!"})
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

              <Button color='primary' onClick={this.editCourse}>Submit</Button>
              </Form>
            </div>
        </div>
      )
    }
  }

const mapStateToProps = state => ({
  course: state.course
  })

const mapDispatchToProps = (dispatch) => {
    return {
        editClass : (class_id) => dispatch(editClass(class_id)),
        fetchClass: (class_id) => dispatch(fetchClass(class_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCourse) ;
