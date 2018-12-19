import React,{Component} from 'react';
import '../css/App.css';
//import { Form, FormGroup, Label, Input, } from 'reactstrap';
import { Form,Select } from 'semantic-ui-react'

import gql from "graphql-tag";

const USER_INSTITUTION_QUERY = gql`
query UserInstition($userid:ID!){
user(id:$userid){
  teacherInstitution{
    id
    name
  }
}
}
`
const CourseInstitutionDropdown = (props) => {

          <Form.Field
            id='institutionId'
            control={Select}
            options={props.institutions}
            onChange={(event, {value}) => { this.setState({ institutionId: value })}}
            label='Institution'
            fluid
            selection
            placeholder='Select Institution'
          />

}

export default CourseInstitutionDropdown
