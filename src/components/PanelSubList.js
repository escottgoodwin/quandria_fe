import React,{Component} from 'react';
import '../css/App.css';
import { Card } from 'semantic-ui-react'

import PanelRow from './PanelRow'

export default class PanelSubList extends Component{

  componentDidMount() {
    this.props.subscribeToNewPanels()
  }

  render(){
    return(
      <>
      <h5>{Object.values(this.props.panelStats).length} Panels</h5>
      <div className="coursecontainer">
      <Card.Group centered>
      {Object.values(this.props.panelStats).map(panel =>
        <PanelRow  key={panel.id} {...panel} />
      )}
      </Card.Group>
      </div>
      </>
    )
  }
}
