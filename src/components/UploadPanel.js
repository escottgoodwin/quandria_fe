import React,{Component} from 'react';
import '../css/App.css';
import { Image, Card, Button } from 'semantic-ui-react'

class UploadPanel extends Component {
  render() {

    return (
<Card>
<Image  src={this.props.link} />
<Card.Content >
<Card.Description><Button size="small" color="red" onClick={()=>this.props.deletePanel(this.props.id)} >Delete</Button></Card.Description>
</Card.Content>
</Card>
)
}

}

export default UploadPanel
