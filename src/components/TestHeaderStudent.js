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

class TestHeaderStudent  extends Component {

  render() {

    const now = new Date()
    const { subject, testNumber, course, testDate, release, releaseDate, published, id, publishDate, startTime, endTime, endDate, panels } = this.props
    //console.log(this.props)
    return (

  <div style={{padding:'20px'}}>

  <h2>

    {course.name} - {course.courseNumber}

    </h2>

<hr/>
  <div >
  <h3>
{testNumber} - {subject} - { moment(testDate).format("dddd MMMM Do YYYY") }
</h3>
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

export default withRouter(TestHeaderStudent)
