import React,{Component} from 'react';
import '../css/App.css';

import { Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'
import TestHeader from '../components/TestHeader'
import EditPublishTestInput from '../components/EditPublishTestInput'

import {TEST_QUERY} from '../ApolloQueries'

class EditPublishTest extends Component {


    render() {

      return (
        <div className="main">
        <div className="container">


      <Query query={TEST_QUERY} variables={{ test_id: this.props.location.state.test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error/>

              const test = data.test

              return (
                <>
                <div style={{padding:"20px"}}>
                <TestHeader  {...test} />
                </div>
                <div style={{paddingRight:'14em',paddingLeft:'14em'}}>
                <EditPublishTestInput {...test} />
                </div>
                </>
            )
          }}
        </Query>

  </div>
  </div>
)
}
}

export default EditPublishTest
