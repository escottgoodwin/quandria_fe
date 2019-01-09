import React,{Component} from 'react';
import '../css/App.css';
import { Grid, Segment, Placeholder } from 'semantic-ui-react'

class TestLoading extends Component {

  render() {


    return (

            <div className="main">
            <div className="container">

            <div >
            <div style={{width:"50%",margin:'auto'}}>
            <Placeholder fluid>

              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder >
            </div>
          <hr/>

            <div style={{width:"75%",margin:'auto',padding:'15px'}}>
            <Placeholder fluid>

              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                

              </Placeholder.Paragraph>
            </Placeholder >
            </div>

            <div style={{width:"75%",margin:'auto'}}>
            <Placeholder fluid>

              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />

              </Placeholder.Paragraph>
            </Placeholder >
            </div>


          <div style={{padding:20}}>


          </div>

          </div>


              <Grid columns={2} stackable className="fill-content">
                <Grid.Row stretched>
                <Grid.Column  >
                <Segment  secondary attached='top'>
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
                  </Placeholder.Paragraph>
                </Placeholder >
                </Segment>
                </Grid.Column>

                <Grid.Column >
                <Segment  secondary attached='top'>
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
                  </Placeholder.Paragraph>
                </Placeholder >
                </Segment>
                </Grid.Column>
              </Grid.Row>
              </Grid>

              </div>
              </div>

      )
    }
  }


export default TestLoading
