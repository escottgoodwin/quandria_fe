import React,{Component} from 'react';
import '../css/App.css';

import CourseHeader from '../components/CourseHeader'
import { Query, Mutation, } from "react-apollo";
import gql from "graphql-tag";
import { Button, Form, TextArea } from 'semantic-ui-react'
import Error from './Error'
import Loading from './Loading'


const COURSE_QUERY = gql`
query CourseQuery($courseid:ID!){
  course(id:$courseid){
    id
    name
    courseNumber
    time
    institution{
      name
    }
    tests{
      id
      subject
      deleted
      testNumber
      release
      testDate
      questions{
        id
        challenges{
          challenge
        }
        questionAnswers{
        answer{
          choice
          correct
        }
      }
      }
      panels{
        id
      }
    }
  }
}
`

const SEND_INVITES_MUTATION = gql`
mutation SendInvites($emails:String,$course_id:ID!){
  sendInvite(emails:$emails,
    courseId:$course_id){
      authMsg
    }
}
`

class CourseInvitation extends Component {

  state = {
        emails:'',
      }

  render() {

    const { course_id }= this.props.location.state

    return (
    <Query query={COURSE_QUERY} variables={{ courseid: course_id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />
            if (error) return <Error/>

            const courseToRender = data.course


        return (

      <div className="main">
        <div className="container">

              <CourseHeader {...courseToRender} />
              <div style={{width:'75%',margin:'auto'}}>
              <div>
                <h4>Send Student Invitations</h4>
              </div>
              <Form>
              <Form.Field
              control={TextArea}
              style={{ minHeight: 200 }}
              label='Emails'
              value={this.state.emails}
              placeholder='Email list...'
              onChange={e => this.setState({ emails: e.target.value })}
              />

              </Form>
              <div style={{padding:"15px"}}>
              <Mutation
                  mutation={SEND_INVITES_MUTATION}
                  variables={{ course_id: course_id, emails: this.state.emails }}
                  onCompleted={data => this._confirm(data)}
                >
                  {mutation => (
                    <Button color='blue' onClick={mutation}>Send Invitations</Button>
                  )}
                </Mutation>
                </div>
                </div>
              </div>
            </div>


        )
      }}
    </Query>
    )
  }
  _confirm = async data => {
    this.props.history.push({
      pathname: `/course_dashboard`,
      state: { course_id: this.props.location.state.course_id  }
      })
  }
}


export default CourseInvitation
