import React,{Component} from 'react';
import '../css/App.css';
import { Card } from 'semantic-ui-react'
import PanelRow from './PanelRow'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Error from '../components/Error'

const NEW_PANEL_QUERY = gql`
query PanelQuery($testId:ID!){
  testPanelStats(testId:$testId){
    panelLink
    total
    totalCorrect
  	percentCorrect
  }
}
`

class PanelList extends Component {

  render() {

      return (

        <Query query={NEW_PANEL_QUERY} variables={{ testId: this.props.id }}>
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
