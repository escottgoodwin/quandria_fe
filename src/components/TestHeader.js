import React,{Component} from 'react';
import dateFormat from 'dateformat'
import '../css/App.css';


import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import { Mutation } from "react-apollo";

import gql from "graphql-tag";

const PUBLISH_TEST_MUTATION = gql`
  mutation PublishTest(
    $test_id: ID!
  ){
    updateTest(
      id: $test_id,
      published:true
    ){
    id
  }
}
`

const RELEASE_QUESTIONS_MUTATION = gql`
  mutation ReleaseQuestions(
    $test_id: ID!
  ){
    updateTest(
      id: $test_id,
      release:true
    ){
    id
  }
}
`

class TestHeader  extends Component {

  render() {


    return (

  <div>
  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: this.props.course.id }
    }} >
  <h2>{this.props.course.name} - {this.props.course.courseNumber}</h2></Link>

  <div >
  <h3>{this.props.testNumber} - {this.props.subject} - { dateFormat(this.props.testDate, "dddd, mmmm dS, yyyy") }</h3>
  </div>

  <div style={{display:'inline-block',padding:5}}>
<Link to={{
  pathname: "/edit_test",
  state:
    {
      test_id: this.props.id,
    }
  }} >

<Button color="blue" >Edit</Button>
<Link  to={{
  pathname: "/add_panels",
  state:
    {
      test_id: this.props.id }
  }} >
  <Button color="blue" >Panels</Button>
  </Link>
</Link>
{this.props.release ?
  <Button disabled onClick={this.props.release_questions} color="blue" >All Questions Released</Button>
:
<Mutation
    mutation={RELEASE_QUESTIONS_MUTATION}
    variables={{ test_id: this.props.test_id }}
    onCompleted={data => this._confirm(data)}
  >
    {mutation => (
      <Button color="blue" >Release All Questions</Button>
    )}
  </Mutation>
}

<Mutation
    mutation={PUBLISH_TEST_MUTATION}
    variables={{ test_id: this.props.test_id }}
    onCompleted={data => this._confirm(data)}
  >
    {mutation => (
      <Button color="blue" >Publish Test</Button>
    )}
  </Mutation>
</div>

<div style={{padding:5}}>
<h5>Total Panels: {this.props.panels.length}</h5>
</div>

</div>

)
}


_confirm = async data => {
  const { id } = data.addCourse
  this.props.history.push({
    pathname: `/course_dashboard`,
    state: { course_id: id  }
    })
}

}

export default TestHeader
