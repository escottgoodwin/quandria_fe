import React,{Component} from 'react';
import dateFormat from 'dateformat'
import {withRouter} from "react-router-dom"
import moment from 'moment'
import '../css/App.css';

import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import AddPanelButton from '../components/AddPanelButton'
import PanelCountButton from '../components/PanelCountButton'
import Error from './Error'


import { Mutation, Query } from "react-apollo";

import {RELEASE_QUESTIONS_MUTATION, PANEL_COUNT_QUERY, TEST_QUERY, PANEL_COUNT_SUBSCRIPTION} from '../ApolloQueries'

class TestHeader  extends Component {

  render() {

    const now = new Date()
    const { subject, testNumber, course, testDate, release, releaseDate, published, id, publishDate } = this.props

    return (

  <div>

  <h2><Link  to={{
    pathname: "/course_dashboard",
    state:
      { course_id: course.id }
    }} >{course.name} - {course.courseNumber}</Link></h2>
<hr/>
  <div >
  <h3>{testNumber} - {subject} - { dateFormat(testDate, "dddd, mmmm dS, yyyy") }</h3>
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

<Query query={PANEL_COUNT_QUERY} variables={{ testId: id }}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return <Button color="blue" loading >14 Panels</Button>
        if (error) return <Error {...error}/>

        const count = data.panels.count

    return (
      <PanelCountButton count={count} testId={id}
        subscribeToNewPanelCount={() =>
          subscribeToMore({
            document: PANEL_COUNT_SUBSCRIPTION,
            variables: {testId: id },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev
              return {
                panels:{
                  count: subscriptionData.data.panelCount.count,
                  __typename: prev.panels.__typename
                }
              }
            }
          }
        )
      }
      />
      )
    }
  }
</Query>

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
  <Button disabled color="blue" >Released: {moment(releaseDate).format("MM-DD-YYYY")}</Button>
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
<h5><b>Test Published:</b> {moment(publishDate).format("MM-DD-YYYY")} <b>End Date:</b> 1/18/2019 <b>Between Hours:</b> 10 AM - 8 PM</h5>
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
