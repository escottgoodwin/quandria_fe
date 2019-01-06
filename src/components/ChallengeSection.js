import React,{Component} from 'react';
import '../css/App.css';
import { Tab, Image, Icon, Grid, Form, Divider, Input, Button } from 'semantic-ui-react'
import ChallengeMessageList from './ChallengeMessageList'
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_CHALLENGE_MESSAGE_MUTATION = gql`
mutation AddChallengeMessage($challengeId: ID!, $challengeMessage: String!) {
  addChallengeMessage(challengeMessage: $challengeMessage,
  challengeId: $challengeId){
    addedBy{
      firstName
    }
    challengeMessage
    challenge{
      answer{
        answer{
          choice
        }
      }
    }
  }
}
`

class ChallengeSection extends Component {

  state = {
        challengeMessage:'',
        test_id: this.props.test_id,
      }
      handleSubmit = () => this.setState({ challengeMessage: ''})

  render() {
      const { challengeMessage, test_id } = this.state
    return (
        <Tab.Pane key={this.props.id}>

        <Grid columns={2} >
        <Grid.Row>
        <Grid.Column >
        <div style={{textAlign: 'left',padding:'20px'}}>

        <div style={{width:"75%"}}>

        <div>
        <b>Challenge:</b> {this.props.challenges.challenge}
        </div>

        <div>
        <b>By:</b> {this.props.challenges.addedBy.firstName} {this.props.challenges.addedBy.lastName}
        </div>

        <div><b>Answer Given:</b>
        {
        this.props.challenges.question.questionAnswers.filter(a => a.addedBy.id === this.props.challenges.addedBy.id)[0].answer.choice
        } </div>

        <div style={{padding:'10px'}}>

        <div>
        <b>Question:</b> {this.props.challenges.question.question}
        </div>

        <div>
        <ul>
        {
          this.props.challenges.question.choices.map(choice => <li key={choice.choice}>{choice.choice} {choice.correct &&  <Icon  size='large' name='check square outline' color='teal' />} </li>)

        }
        </ul>
        </div>

        <div>
        <b>By:</b>{this.props.challenges.question.addedBy.firstName} {this.props.challenges.question.addedBy.lastName}
        </div>

        </div>

        <div>
        <Image size="medium" src={this.props.challenges.question.panel.link} />
        </div>

        </div>

        </div>


        </Grid.Column>

        <Grid.Column centered>

        <ChallengeMessageList {...this.props.challenges}/>
        <Form onSubmit={this.handleSubmit}>
        <div style={{margin:'15px'}}>

        <Form.Group>


        <Mutation
            mutation={ADD_CHALLENGE_MESSAGE_MUTATION}
            variables={{ challengeId: this.props.challenges.id, challengeMessage:challengeMessage }}
            onCompleted={data => this._confirm(data)}
            refetchQueries={() => {
               return [{
                  query: gql`
                  query TestChallenges($testId:ID!){
                    test(id:$testId){
                        id
                        subject
                        testNumber
                        testDate

                        course{
                          id
                          name
                          courseNumber
                        }
                        questions{
                          challenges{
                            challenge
                            addedBy{
                              id
                              firstName
                              lastName
                            }
                            challengeMessages{
                              id
                              challengeMessage
                              addedDate
                              addedBy{
                                firstName
                                lastName
                              }
                            }
                            id
                            question{
                              question
                              choices{
                                correct
                                choice
                              }
                  						questionAnswers{
                                addedBy{
                                  id
                                  firstName
                                }
                                answer{
                                  choice
                                }
                              }
                              panel{
                                link
                              }
                              addedBy{
                                firstName
                                lastName
                              }
                            }

                          }
                        }

                      }
                  }
                `,
                  variables: { testId: test_id }
              }];
              }} >
            {mutation => (
              <Input
              action={ <Button size="tiny" color='teal' onClick={mutation}>Submit</Button>}
                size="tiny"
                    placeholder='comment...'
                    name='challengeMessage'
                    value={this.state.challengeMessage}

                    onChange={e => this.setState({ challengeMessage: e.target.value })}
                  />
              //<Button size="tiny" color='teal' onClick={mutation}>Submit</Button>
            )}
          </Mutation>
          </Form.Group>

          </div>

        </Form>

        </Grid.Column>
        </Grid.Row>

        </Grid>
        <Divider vertical />
        </Tab.Pane>

    )
  }
  _confirm = async data => {
    this.props.history.push({
      pathname: `/challenge_dashboard`,
      state: { test_id: this.props.test_id  }
      })
  }

}


export default withRouter(ChallengeSection)
