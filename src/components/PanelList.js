import React,{Component} from 'react';
import '../css/App.css';
import { Card } from 'semantic-ui-react'

import { Query } from "react-apollo";
import {TEST_PANEL_STATS_QUERY} from '../ApolloQueries'

import PanelRow from './PanelRow'

import Error from '../components/Error'

class PanelList extends Component {

  render() {

      return (

        <Query query={TEST_PANEL_STATS_QUERY} variables={{ testId: this.props.id }}>
              {({ loading, error, data }) => {
                if (loading) return <div>Loading...</div>
                if (error) return <Error {...error}/>

                const panelStats = data.testPanelStats

            return (

              <div className="coursecontainer">
              <Card.Group centered>
              {panelStats.map(panel =>
                <PanelRow  key={panel.panelLink} {...panel} />
                )}
                </Card.Group>
              </div>
              )
            }

          }
        </Query>
)
}
}

export default PanelList
