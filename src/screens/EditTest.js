import React,{Component} from 'react';
import '../css/App.css';
//import { Form, FormGroup, Label, Input, } from 'reactstrap';

import { Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'

import EditTestInput from '../components/EditTestInput'
import EditTestHeader from '../components/EditTestHeader'

import {TEST_EDIT_QUERY} from '../ApolloQueries'

class EditTest extends Component {

render() {

  return (
    <div className="main">
    <div className="dashboard">
      <div className="signin">


    <Query query={TEST_EDIT_QUERY} variables={{ test_id: this.props.location.state.test_id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading/>
            if (error) return <Error {...error}/>

            const testToRender = data.test

        return (
            <div>
            <div style={{padding:"20px"}}>
            <EditTestHeader  {...testToRender} />
            <h2>Edit Test</h2>
            </div>
            <EditTestInput {...testToRender}/>
            </div>
            )
          }}
        </Query>
        </div>
        </div>
        </div>
      )
  }
}

export default EditTest ;
