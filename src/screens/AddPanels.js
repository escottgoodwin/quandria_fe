import React,{Component} from 'react'
import '../css/App.css'

import ChallengeHeader from '../components/ChallengeHeader'
import DropZoneUpload from '../components/DropZoneUpload2'
import AddPanelList from '../components/AddPanelList'
import Loading from '../screens/Loading'
import Error from './Error'

import { Query } from "react-apollo"

import {PANEL_QUERY} from '../ApolloQueries'

class AddPanels extends Component {

    render() {
      const { test_id } = this.props.location.state
      const auth_token = sessionStorage.getItem('auth_token');

      return (

        <Query query={PANEL_QUERY} variables={{ test_id: test_id }}>
              {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <Error {...error}/>

                const testToRender = data.test

            return (
              <div className="main">
              <div className="coursecontainer">

              <ChallengeHeader {...testToRender }/>

              <div style={{padding:"15px"}}>
              </div>

              <DropZoneUpload token={auth_token} {...testToRender} />

              <AddPanelList test_id={test_id}/>
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
