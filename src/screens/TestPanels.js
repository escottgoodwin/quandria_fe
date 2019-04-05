import React,{Component} from 'react'
import '../css/App.css'
import { Query } from "react-apollo"

import {PANEL_QUERY} from '../ApolloQueries'

import ChallengeHeader from '../components/ChallengeHeader'
import PanelList from '../components/PanelList2'
import AddPanelButton from '../components/AddPanelButton'
import Error from '../components/Error'
import Loading from './Loading'

class StudentPerformance extends Component {

  render() {

    const { test_id } = this.props.location.state

      return (


      <Query query={PANEL_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error {...error} />

              const testToRender = data.test

          return (
            <div className="main">
      <div className="container">
      <div className="coursecontainer">

      <ChallengeHeader {...testToRender}/>

      <div style={{padding:'15px'}}>

      <AddPanelButton {...testToRender}/>

      <div className="coursecontainer">

      <PanelList {...testToRender}/>

      </div>
    </div>
    </div>
    </div>


</div>

)
}


}
</Query>
)
}
}



export default StudentPerformance
