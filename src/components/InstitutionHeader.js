import React from 'react';
import '../css/App.css';

import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const InstitutionHeader = (props) =>

  <div>
  <div style={{padding:15}}>
  <Link  to={{
    pathname: "/institution_dashboard",
    state:
      { institutionId: props.id }
    }} >
    <h2>{props.name}</h2>
    </Link>
    </div>

   <div style={{display:'inline-block',padding:5}}>
     <Link  to={{
       pathname: "/edit_institution",
       state:
         { institutionId: props.id }
       }} >
        <Button color="blue" >Edit Institution</Button>
       </Link>
    </div>

    <div style={{display:'inline-block',padding:5}}>
      <Link  to={{
        pathname: "/add_admin",
        state:
          { institutionId: props.id }
        }} >
        <Button color="blue" >Add Administrator</Button>
       </Link>
     </div>

   <div style={{display:'inline-block',padding:5}}>
     <Link  to={{
       pathname: "/add_teacher",
       state:
         { institutionId: props.id }
       }} >
       <Button color="blue" >Add Teacher</Button>
      </Link>
    </div>

  </div>


export default InstitutionHeader
