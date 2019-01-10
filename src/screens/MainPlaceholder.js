import React from 'react'
import { Placeholder, Segment } from 'semantic-ui-react'

const MainPlaceholder = () => (


<div className="main">

  <div className="container">
    <div style={{padding:"15px",width:"500px",margin:'auto'}}>
    <Segment>
  <Placeholder fluid>

    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      </Placeholder.Paragraph>

    </Placeholder>
    </Segment>
    </div>

  <div className="coursecontainer">
  <Segment>
  <Placeholder fluid>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />

      </Placeholder.Paragraph>
    </Placeholder>
    </Segment >

    <Segment>
    <Placeholder fluid>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />

        </Placeholder.Paragraph>
      </Placeholder>
      </Segment >

      <Segment>
      <Placeholder fluid>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
        </Segment >

  </div>

</div>

</div>




)

export default MainPlaceholder
