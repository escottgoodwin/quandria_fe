import React from 'react';
import '../css/App.css';
import { Card } from 'semantic-ui-react'
import PanelRow from './PanelRow'

const PanelList = (props) =>
  <div className="coursecontainer">
  <Card.Group centered>
  {props.panels.map(panel =>
    <PanelRow  key={panel.link} {...panel} />
    )}
    </Card.Group>
  </div>

export default PanelList
