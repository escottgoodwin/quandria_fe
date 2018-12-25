import React,{Component} from 'react';
import '../css/App.css';
//import { Form, FormGroup, Label, Input, } from 'reactstrap';

import { Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'

import EditTestInput from '../components/EditTestInput'
import EditTestHeader from '../components/EditTestHeader'

import gql from "graphql-tag";


const TEST_QUERY = gql`
  query TestQuery($test_id: ID!){
    test(id:$test_id){
      subject
      testDate
      testNumber
      id
      course {
        id
        name
        courseNumber
      }
  }
}
`

class EditTest extends Component {

render() {

  return (
    <div className="main">
    <div className="dashboard">
      <div className="signin">
        <h2>Edit Test</h2>

    <Query query={TEST_QUERY} variables={{ test_id: this.props.location.state.test_id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading/>
            if (error) return <Error/>

            const testToRender = data.test
            console.log(testToRender)

        return (
            <div>
            <EditTestHeader  {...testToRender} />

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
