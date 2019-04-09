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
      {console.log(this.props.panelStats)}
      <h5>{this.props.panelStats.length} Panels</h5>
      <div className="coursecontainer">
      <Card.Group centered>
      {this.props.panelStats.map(panel =>
        <PanelRow  key={panel.id} {...panel} />
      )}
      </Card.Group>
      </div>
      </>
    )
  }
}
