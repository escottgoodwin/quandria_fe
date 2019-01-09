import React,{Component} from 'react';
import '../css/App.css';
import { Placeholder, Grid } from 'semantic-ui-react'

class ChallengeLoading extends Component {

  render() {


      return (

            <div className="main">

                <div className="container">

                <div style={{width:"50%", margin:"auto"}}>
                <Placeholder fluid>

                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>

                </Placeholder>
                <hr/>
                <Placeholder fluid>

                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
                </Placeholder>
                </div>


                  <div className="coursecontainer">
                  <div style={{width:"30%", margin:"auto"}}>
                  <Placeholder fluid>

                  <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Paragraph>

                  </Placeholder>
                  </div>
                  <hr/>
                  <Grid>
                    <Grid.Row>
                    <Grid.Column width={4}>
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
                    </Placeholder.Paragraph>

                    </Placeholder>

                    </Grid.Column>
                    <Grid.Column width={12}>
                    <div style={{minHeight:"400px"}}>
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

                  </Placeholder>
                  </div>
                  </Grid.Column>


                  </Grid.Row>
                  </Grid>
                  </div>
                </div>


            </div>

    )
  }
}

export default ChallengeLoading
