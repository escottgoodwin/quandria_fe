import React,{Component} from 'react';
import {withRouter} from "react-router-dom"
import moment from 'moment'
import '../css/App.css';

import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import AddPanelButton from '../components/AddPanelButton'
import PanelCountButton from '../components/PanelCountButton'

import { Mutation} from "react-apollo";

import {RELEASE_QUESTIONS_MUTATION, TEST_QUERY } from '../ApolloQueries'

class TestHeader  extends Component {

  render() {

    const now = new Date()
    const { subject, testNumber, course, testDate, release, releaseDate, published, id, publishDate, startTime, endTime, endDate, panels } = this.props
    //console.log(this.props)
    return (

  <div>

  <h2>
  <Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: course.id }
    }} >
    {course.name} - {course.courseNumber}
    </Link>
    </h2>

<hr/>
  <div >
  <h3>
  <Link  to={{
    pathname: "/test_dashboard",
    state:
      { test_id: id }
    }} >{testNumber} - {subject} - { moment(testDate).format("dddd MMMM Do YYYY") }
    </Link></h3>
  </div>

  <div style={{display:'inline-block',padding:15}}>
<Link to={{
  pathname: "/edit_test",
  state:
    {
      test_id: id,
    }
  }} >

<Button color="blue" >Edit</Button>
</Link>


<AddPanelButton {...this.props} />

<PanelCountButton count={panels.length} testId={id}  />

{published ?
  <Link  to={{
    pathname: "/edit_publish_test",
    state:
      {
        test_id: id }
    }} >
  <Button color="blue" >Edit Published Test</Button>
  </Link>
:

  <Link  to={{
    pathname: "/publish_test",
    state:
      {
        test_id: id }
    }} >
      <Button color="blue" >Publish Test</Button>
  </Link>

}

{published ?

release ?
  <Button disabled color="blue" >Released: {moment(releaseDate).format("MMMM Do YYYY")}</Button>
:
<Mutation
    mutation={RELEASE_QUESTIONS_MUTATION}
    variables={{ test_id: id, releaseDate: now }}
    onCompleted={data => this._confirm(data)}
    refetchQueries={() => {
       return [{
          query: TEST_QUERY,
          variables: { test_id: id }
      }]}}
  >
    {mutation => (
      <Button color="blue" onClick={mutation} >Release All Questions</Button>
    )}
  </Mutation>
:
  <Button  color="blue" >Release All Questions</Button>
}


</div>

<div style={{padding:20}}>
{published &&
<h5><b>Test Published:</b> {moment(publishDate).format("MMMM Do YYYY")} <b>End Date:</b> {moment(endDate).format("MMMM Do YYYY")} <b>Between Hours:</b> {startTime} - {endTime}</h5>
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
