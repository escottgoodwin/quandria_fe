import React,{Component} from 'react';
import '../css/App.css';
import { Image, Card, Button, Dimmer, Header, Icon } from 'semantic-ui-react'

class UploadPanel extends Component {
  state = {}

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { active } = this.state
    const content = (
      <div>
        <Header as='h2' inverted>
          Title
        </Header>

        <Button color="red" onClick={()=>this.props.deletePanel(this.props.id)}>Delete</Button>
      
      </div>
    )

    return (
      <div style={{padding:"5px"}}>
      <Dimmer.Dimmable
             as={Image}
             dimmed={active}
             dimmer={{ active, content }}
             onMouseEnter={this.handleShow}
             onMouseLeave={this.handleHide}
             size='medium'
             src={this.props.link}
           />
           </div>

)
}

}

export default UploadPanel
