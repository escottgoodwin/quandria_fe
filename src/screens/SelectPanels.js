import React, {Component} from 'react';
import '../css/App.css';


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

export default SelectPanels
