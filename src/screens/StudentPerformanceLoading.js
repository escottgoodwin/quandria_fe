import React,{Component} from 'react';
import '../css/App.css';
import { Segment, Grid, Placeholder } from 'semantic-ui-react'


class StudentPerformanceLoading extends Component {

  render() {

      return (



        <div >
        <div style={{width:"50%", margin:"auto"}}>

        <Placeholder fluid>

          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />

          </Placeholder.Paragraph>

        </Placeholder >

        </div>

<hr />

  <div style={{width:"60%", margin:"auto"}}>
  <Placeholder fluid>

    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>

  </Placeholder >
  </div>

      <div className="coursecontainer">
      <div style={{width:"30%", margin:"auto"}}>
    <Placeholder fluid>

      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder >
</div>
      <div className="coursecontainer">

      <Grid columns={2} stackable className="fill-content">

        <Grid.Row stretched>
        <Grid.Column  >
          <Segment  secondary attached='top'>
          <Placeholder fluid>

            <Placeholder.Paragraph>
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder >
        </Segment>
            <Segment style={{ minHeight: 400 }} attached>
              <Placeholder fluid>
              <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder >
          </Segment>

        </Grid.Column  >

        <Grid.Column  >
          <Segment  secondary attached='top'>
          <Placeholder fluid>

            <Placeholder.Paragraph>
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder >
        </Segment>


              <Segment style={{ minHeight: 400 }} attached>
              <Placeholder fluid>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder >
            </Segment>

        </Grid.Column  >


      </Grid.Row>
      </Grid>

      </div>
    </div>
    </div>





)
}
}



export default StudentPerformanceLoading ;
