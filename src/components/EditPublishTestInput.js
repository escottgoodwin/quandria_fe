import React,{Component} from 'react';
import '../css/App.css';
import { Form, Button, Select, Message } from 'semantic-ui-react'
import {  DateTimeInput } from 'semantic-ui-calendar-react';
import moment from 'moment'
import {withRouter} from "react-router-dom"

import { Mutation } from "react-apollo";

import {EDIT_PUBLISH_TEST_MUTATION, PUBLISH_TEST_REFETCH_QUERY} from '../ApolloQueries'

class EditPublishTestInput extends Component {

  state = {
        test_id:this.props.id,
        published:this.props.published,
        startTime: this.props.startTime,
        endDate:moment(this.props.endDate).format(),
        endTime:this.props.endTime,
        graphQLErrorL:false,
        isVisibleGraph:false,
        networkError:false,
        isVisibleNet:false,

        }

    handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

    render() {
      const { test_id,
              published,
              startTime,
              endTime,
              endDate,
              graphQLError,
              networkError,
              isVisibleNet,
              isVisibleGraph  } = this.state

      const statStopNumbers = [
      {value:"6 AM",text:"6 AM"},
      {value:"7 AM",text:"7 AM"},
      {value:"8 AM",text:"8 AM"},
      {value:"9 AM",text:"9 AM"},
      {value:"10 AM",text:"10 AM"},
      {value:"11 AM",text:"11 AM"},
      {value:"12 PM",text:"12 PM"},
      {value:"1 PM",text:"1 PM"},
      {value:"2 PM",text:"2 PM"},
      {value:"3 PM",text:"3 PM"},
      {value:"4 PM",text:"4 PM"},
      {value:"5 PM",text:"5 PM"},
      {value:"6 PM",text:"6 PM"},
      {value:"7 PM",text:"7 PM"},
      {value:"8 PM",text:"8 PM"},
      {value:"9 PM",text:"9 PM"},
      {value:"10 PM",text:"10 PM"},
      {value:"11 PM",text:"11 PM"}
    ]


      return (
        <div >



      <h2>Edit Published Test</h2>
      <Form size="big">

      <DateTimeInput
      label='Test End Date'
      dateFormat="MM-DD-YYYY"
      timeFormat="AMPM"
      name="endDate"
      placeholder="Test End Date"
      value={this.state.endDate}
      iconPosition="left"
      onChange={this.handleChange} />

      <Form.Group widths='equal'>

      <Form.Field
        id='startTime'
        control={Select}
        options={statStopNumbers}
        value={this.state.startTime}
        onChange={(event, {value}) => { this.setState({ startTime: value })}}
        label='Start Time'
        fluid
        selection
        placeholder='Select Start Time'
      />


      <Form.Field
        id='stopTime'
        control={Select}
        options={statStopNumbers}
        value={this.state.endTime}
        onChange={(event, {value}) => { this.setState({ endTime: value })}}
        label='Stop Time'
        fluid
        selection
        placeholder='Select Stop Time'
      />
      </Form.Group>

      <Mutation
          mutation={EDIT_PUBLISH_TEST_MUTATION}
          variables={{
            startTime:startTime,
            endTime:endTime,
            endDate:endDate,
            published: published,
            testId: test_id
          }}
          onCompleted={data => this._confirm(data)}
          onError={error => this._error (error)}
          refetchQueries={() => {
             return [{
                query: PUBLISH_TEST_REFETCH_QUERY,
                variables: { test_id: test_id }
            }];
        }}
        >
          {mutation => (
            <Button  color='blue' onClick={mutation}>Submit</Button>
          )}
        </Mutation>

        {isVisibleGraph &&
          <Message negative>
            <p><b>{graphQLError}</b></p>
          </Message>
        }

        {isVisibleNet &&
          <Message negative>
            <p><b>{networkError}</b></p>
          </Message>
        }

      </Form>
    </div>

)
}

_confirm = async data => {
  const { id } = data.editPublishTest
  this.props.history.push({
    pathname: `/test_dashboard`,
    state: { test_id: id  }
    })
  }
}

export default withRouter(EditPublishTestInput)
