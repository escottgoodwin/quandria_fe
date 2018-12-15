import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../css/App.css';

import { fetchClass } from '../actions/classActions';
import { fetchTest } from '../actions/testActions';
import { fetchAllPanels, addPanelTests } from '../actions/panelActions';

import EditTestHeader from '../components/EditTestHeader'
import AllPanels from '../components/AllPanels'

class SelectPanels extends Component {

  constructor(props) {
      super(props);

      this.state = {
        panels: [],
        selected_panels: [],
        test_id:''
      };

    }

    componentDidMount(){
      const { course_id } = this.props.location.state
      const { test_id } = this.props.location.state
      this.props.fetchAllPanels(test_id)
      this.props.fetchClass(course_id)
      this.props.fetchTest(test_id)
      console.log("state",this.state)
      console.log("props",this.props)
    }

    handleAllChecked = (event) => {
      let panels = this.state.panels
      this.state.panels.forEach(panel => panel.isChecked = event.target.checked)
      this.setState({panels})
  }

    handleCheckChildElement = (event) => {
      let panels = this.state.panels
      panels.forEach(panel => {
         if (panel.panel_id === event.target.value)
          if (panel.isChecked ===  true) {
            panel.isChecked =  false
          } else {
            panel.isChecked =  true
          }
      })
      this.setState({panels})

    }

    selectPanels = () => {
      const panels = this.state.panels
      const selected_panels = []
      panels.forEach(panel => {
        if (panel.isChecked === true){
          const panel_dispatch = {'panel_id':panel.panel_id,'test_id':this.state.test_id,'isChecked':true}
          selected_panels.push(panel_dispatch)
        } else {
          const panel_dispatch = {'panel_id':panel.panel_id,'test_id':'','isChecked':false}
          selected_panels.push(panel_dispatch)
          }
        }
      )
      console.log(selected_panels)
      selected_panels.map(panel_dispatch => this.props.addPanelTests(panel_dispatch))
    }


 render() {
   //const rowText = this.state.selectedIndexes.length === 1 ? 'row' : 'rows';
   return (

      <div className="main">

          <div className="panelcontainer">

            <h3>Select Panels</h3>

            <EditTestHeader {...this.props }/>

            <div className="coursecontainer">

            <AllPanels {...this.props }/>

            </div>
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

const mapDispatchToProps = (dispatch,) => {
    return {
        fetchClass : (course_id) => dispatch(fetchClass(course_id)),
        fetchTest : (test_id) => dispatch(fetchTest(test_id)),
        fetchAllPanels : (test_id) => dispatch(fetchAllPanels(test_id)),
        addPanelTests : (panel) => dispatch(addPanelTests(panel)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPanels)
