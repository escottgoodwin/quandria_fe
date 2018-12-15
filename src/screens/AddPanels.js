import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Row,Col } from 'reactstrap';
import ReactDropzone from "react-dropzone"
import '../css/App.css';

import EditTestHeader from "../components/EditTestHeader";

import { fetchTest } from '../actions/testActions';
import { fetchClass } from '../actions/classActions';
import { uploadPanels,fetchAllPanels,deletePanel } from '../actions/panelActions';

class AddPanels extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      course_id:'',
      test_id:'',
      progress:0,
      uploading:false,
      panels:[],
      deleteId:'',
      showingAlert:false,
      message:'',
      color:''

    }
  }

  componentDidMount() {
    const {course_id } = this.props.location.state
    const { test_id } = this.props.location.state
    this.props.fetchClass(course_id)
    this.props.fetchTest(test_id)
    this.props.fetchAllPanels(test_id)
    this.setState({course_id,test_id,panels:this.props.panel.panels})

    console.log('state',this.state)
    console.log('props',this.props)
    }

    onDrop = (files) => {
      this.setState({files})

    }

    onPreviewDrop = (files) => {
      const { course_id } = this.props.location.state
      const { test_id } = this.props.location.state
        const total = files.length

         files.map(file =>
           this.props.uploadPanels({file:file,course_id:course_id,test_id:test_id}),
          this.setState( {progress: (this.state.progress+1/total)*100 })
          )

          this.setState({
           message:'Images Uploaded!',
           color:'green',
           showingAlert: true
         });

           setTimeout(() => {
             this.setState({
               showingAlert: false
             });
           }, 2000);
         }

    deleteImage = e => {
      console.log(e.target.id)
      this.props.deletePanel(e.target.id)
      this.setState({
       message:'Image Deleted!',
       color:'red',
       showingAlert: true,
     });

       setTimeout(() => {
         this.setState({
           showingAlert: false
         });
       }, 2000);
     }

    render() {

      return (

        <div className="main">

            <div className="container">

              <EditTestHeader {...this.props }/>
              <div>
              Panels: {this.props.panel.panels.length}
              </div>
              <div style={{height:10,color:[this.state.color]}} >
            {this.state.showingAlert &&
              <div>{this.state.message}</div>
            }
            </div>
              <hr />
              <Row>

              <Col xs="2">
              <div style={{margin:9}}>
              <ReactDropzone
                accept="image/jpeg,image/jpg, image/png"
                onDrop={this.onPreviewDrop} >
                Drop images or click to select images
              </ReactDropzone>

              </div>
              </Col>

              <Col xs="10">
              <div>
              {this.props.panel.panels.map(panel =>
                <label key={panel.panel_id} style={{padding:10}}> <img onClick={this.deleteImage} width="200" id={panel.panel_id} key={panel.panel_id} src={panel.link} alt="" /></label>
                )}
            </div>
            </Col>

            </Row>


            </div>
        </div>
      )
    }
  }

  const mapStateToProps = state => ({
    course: state.course.sel_course,
    panel: state.panel,
    test: state.test
    })

  const mapDispatchToProps = (dispatch) => {
      return {
          fetchClass : (course_id) => dispatch(fetchClass(course_id)),
          uploadPanels : (panel) => dispatch(uploadPanels(panel)),
          fetchAllPanels : (test_id) => dispatch(fetchAllPanels(test_id)),
          fetchTest : (test_id) => dispatch(fetchTest(test_id)),
          deletePanel : (panel_id) => dispatch(deletePanel(panel_id)),

      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AddPanels)
