import React from 'react';
import '../css/App.css';
import SignInButton from './SignInButton'
import DashboardButton from './DashboardButton'
import { Button, Grid } from 'semantic-ui-react'

import {Link} from 'react-router-dom'

const Nav = (props) =>
<div className="header1">
  <Grid columns={3}>
    <Grid.Row>
    <Grid.Column floated='left' width={4}>
    <DashboardButton />
    </Grid.Column>
    <Grid.Column width={8}>
    <Link  to="/"><Button size='large' basic color='blue'>Quandrio</Button></Link>
    </Grid.Column>
    <Grid.Column floated='right' width={4}>
    <SignInButton />
    </Grid.Column>
    </Grid.Row>
  </Grid>
  </div>

export default Nav
