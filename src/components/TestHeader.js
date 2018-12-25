import React,{Component} from 'react';
import dateFormat from 'dateformat'
import {withRouter} from "react-router-dom"
import moment from 'moment'
import '../css/App.css';

import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import AddPanelButton from '../components/AddPanelButton'
import { Mutation } from "react-apollo";

import gql from "graphql-tag";

const PUBLISH_TEST_MUTATION = gql`
  mutation PublishTest(
    $test_id: ID!,
    $publishDate: DateTime
  ){
    updateTest(
      id: $test_id,
      published:true,
      publishDate: $publishDate
    ){
    id
    course {
      id
    }
  }
}
`

const RELEASE_QUESTIONS_MUTATION = gql`
  mutation ReleaseQuestions(
    $test_id: ID!
    $releaseDate: DateTime
  ){
    updateTest(
      id: $test_id,
      release:true,
      releaseDate: $releaseDate
    ){
    id
    course {
      id
    }
  }
}
`

const TEST_QUERY = gql`
query TestQuery($test_id:ID!){
  test(id:$test_id){
      id
      subject
      testNumber
      testDate
      release
      releaseDate
      published
      publishDate
    	course{
        id
        name
        courseNumber
      }
      panels{
        id
    }
    }
  }
`


class TestHeader  extends Component {

  render() {

    const now = new Date()

    return (

  <div>
  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: this.props.course.id }
    }} >
  <h2>{this.props.course.name} - {this.props.course.courseNumber}</h2></Link>
<hr/>
  <div >
  <h3>{this.props.testNumber} - {this.props.subject} - { dateFormat(this.props.testDate, "dddd, mmmm dS, yyyy") }</h3>
  </div>

  <div style={{display:'inline-block',padding:15}}>
<Link to={{
  pathname: "/edit_test",
  state:
    {
      test_id: this.props.id,
    }
  }} >

<Button color="blue" >Edit</Button>
</Link>

<AddPanelButton {...this.props}/>

{this.props.panels.length>0 ?

<Link  to={{
  pathname: "/test_panels",
  state:
    {
      test_id: this.props.id }
  }} >
  <Button color="blue" >{this.props.panels.length} Panels</Button>
</Link>
:
<Button disabled color="blue" >{this.props.panels.length} Panels</Button>
}

{this.props.release ?
  <Button disabled color="blue" >Released: {moment(this.props.releaseDate).format("MM-DD-YYYY")}</Button>
:
<Mutation
    mutation={RELEASE_QUESTIONS_MUTATION}
    variables={{ test_id: this.props.id, releaseDate: now }}
    onCompleted={data => this._confirm(data)}
    refetchQueries={() => {
       return [{
          query: TEST_QUERY,
          variables: { test_id: this.props.id }
      }]}}
  >
    {mutation => (
      <Button color="blue" onClick={mutation} >Release All Questions</Button>
    )}
  </Mutation>
}

{this.props.published ?
  <Button disabled color="blue" >Published: {moment(this.props.publishDate).format("MM-DD-YYYY")}</Button>

:

<Mutation
    mutation={PUBLISH_TEST_MUTATION}
    variables={{ test_id: this.props.id, publishDate: now }}
    onCompleted={data => this._confirm(data)}
    refetchQueries={() => {
       return [{
          query: TEST_QUERY,
          variables: { test_id: this.props.id }
      }]}}
  >
    {mutation => (
      <Button color="blue" onClick={mutation} >Publish Test</Button>
    )}
  </Mutation>
}
</div>

</div>

)
}


_confirm = async data => {
  const { id } = data.updateTest
  this.props.history.push({
    pathname: `/test_dashboard`,
    state: { test_id: id }
    })
}

}

export default withRouter(TestHeader)
