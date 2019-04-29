import React,{Component} from 'react'
import '../css/App.css'
//import { Form, FormGroup, Label, Input, } from 'reactstrap'
import EditInstitutionInput from '../components/EditInstitutionInput'
import InstitutionHeader from '../components/InstitutionHeader'

import CoursePlaceholder from './CoursePlaceholder'
import Error from './Error'

import { Query } from "react-apollo"

import {INSTITUTION_QUERY} from '../ApolloQueries'

class EditInstitution extends Component {

render() {

  const { institutionId }= this.props.location.state

  return (


    <div className="main">

      <div className="container">

      <Query query={INSTITUTION_QUERY} variables={{ institutionId: institutionId }} fetchPolicy="cache-and-network" >
            {({ loading, error, data }) => {
              if (loading) return <CoursePlaceholder />
              if (error) return <Error {...error}/>

          return (
            <>
            <InstitutionHeader {...data.institution} />
            <EditInstitutionInput {...data.institution} />
            </>
          )
        }}
      </Query>

      </div>
      </div>
      )
    }

  }

export default EditInstitution
