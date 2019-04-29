import React,{Component} from 'react'
import '../css/App.css'
import InstitutionHeader from '../components/InstitutionHeader'
import EditAdministratorInput from '../components/EditAdministratorInput'


import { Query } from "react-apollo"
import Error from './Error'

import CoursePlaceholder from './CoursePlaceholder'

import {INSTITUTION_QUERY, PERSONNEL_QUERY} from '../ApolloQueries'

class EditAdministrator extends Component {

  render() {

    const { institutionId, userId, personnelType  }= this.props.location.state

    return (
      <div className="main">
    <Query query={INSTITUTION_QUERY} variables={{ institutionId: institutionId }} fetchPolicy="cache-and-network" >
          {({ loading, error, data }) => {
            if (loading) return <CoursePlaceholder />
            if (error) return <Error {...error}/>

        return (

              <InstitutionHeader {...data.institution} />
            )
          }}
        </Query>

        <Query query={PERSONNEL_QUERY} variables={{ userId: userId }} fetchPolicy="cache-and-network" >
              {({ loading, error, data }) => {
                if (loading) return <CoursePlaceholder />
                if (error) return <Error {...error}/>

            return (

              <div style={{marginRight:'250px',marginTop:'25px',marginLeft:'250px'}} >

              <h2>Edit {personnelType}</h2>

              <EditAdministratorInput institutionId={institutionId} {...data.user} />

              </div>

        )
      }}
    </Query>
    </div>
    )
  }

}


export default EditAdministrator
