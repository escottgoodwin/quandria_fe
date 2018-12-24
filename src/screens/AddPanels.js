import React,{Component} from 'react';

import '../css/App.css';
import {Link} from 'react-router-dom'
import ChallengeHeader from '../components/ChallengeHeader'
import DropZoneUpload from '../components/DropZoneUpload'
import PanelCount from '../components/PanelCount'

import { Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'
import gql from "graphql-tag";
import axios from 'axios'


const CHALLENGE_QUERY = gql`
query TestChallenges($test_id:ID!){
  test(id:$test_id){
      id
      subject
      testNumber
      testDate
      course{
        id
        name
        courseNumber
      }
      panels{
        link
        id
      }
      }
    }
`

class AddPanels extends Component {


    render() {
      const { test_id } = this.props.location.state
      const auth_token = sessionStorage.getItem('auth_token');

      return (

        <Query query={CHALLENGE_QUERY} variables={{ test_id: test_id }}>
              {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <Error />

                const testToRender = data.test

            return (

        <div className="main">

            <div className="container">

              <ChallengeHeader {...testToRender }/>

              <DropZoneUpload token={auth_token} {...testToRender}/>

            </div>
        </div>
      )
      }


      }
    </Query>
    )
  }
}


export default AddPanels
