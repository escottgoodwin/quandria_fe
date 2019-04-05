import React,{Component} from 'react'
import '../css/App.css'
import { Query } from "react-apollo"

import Error from './Error'
import PlaceholderQ from '../components/Placeholder'

import {TEST_STATS_PERFORMANCE_QUERY} from '../ApolloQueries'

class TestStats extends Component {

  render(){
    return (

      <Query query={TEST_STATS_PERFORMANCE_QUERY} variables={{ testId: this.props.test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <PlaceholderQ />
              if (error) return <Error error={error} />

              const stats = data.testStats

          return (

            <div >
              <div><h4><b>Percent Correct:</b> { stats.totalCorrect/stats.total >0 ? Math.round(stats.totalCorrect/stats.total*100) : 0 }% </h4></div>
              <div><h4><b>Total Correct:</b> {stats.totalCorrect}  <b>Total:</b> {stats.total}</h4></div>
            </div>
            )
          }}
          </Query>

    )
  }

}

export default TestStats
