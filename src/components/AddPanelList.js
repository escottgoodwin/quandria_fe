import React,{Component} from 'react';
import '../css/App.css';
import { Query } from "react-apollo";
import Error from './Error'
import PlaceholderQ from './Placeholder'

import AddPanelSubList from './AddPanelSubList'

import { TEST_PANEL_STATS_QUERY, NEW_PANEL_SUBSCRIPTION } from '../ApolloQueries'

class AddPanelList extends Component {

  render(){
    const { test_id } = this.props
    return (

      <Query query={TEST_PANEL_STATS_QUERY} variables={{ testId: test_id }}>
            {({ loading, error, data, subscribeToMore }) => {
              if (loading) return <PlaceholderQ />
              if (error) return <Error error={error} />

                const testPanelStats = data.testPanelStats

          return (

            <AddPanelSubList panelStats={testPanelStats} testId={test_id}
              subscribeToNewPanels={() =>
                subscribeToMore({
                  document: NEW_PANEL_SUBSCRIPTION,
                  variables: {testId: test_id },
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev
                    let newPanel = subscriptionData.data.newPanel
                    return {
                      testPanelStats: [...prev.testPanelStats, newPanel]
                    }
              }
            }
          )
          }
        />

          )
        }}
      </Query>
    )
  }

}

export default AddPanelList
