import React,{Component} from 'react';
import '../css/App.css';
import { Query } from "react-apollo";

import Error from './Error'
import PlaceholderQ from '../components/Placeholder'
import TestQuestionPerformance from '../components/TestQuestionPerformance'

import {TEST_QUESTION_STATS_QUERY} from '../ApolloQueries'

const uuidv4 = require('uuid/v4');

class TestQuestionStats extends Component {

  render(){
    return (

      <Query query={TEST_QUESTION_STATS_QUERY} variables={{ testId: this.props.test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <PlaceholderQ />
              if (error) return <Error error={error} />

              const stats = []
              data.testQuestionStats.forEach(function(element) {
              const id = uuidv4()
                const item =  {
                  id: id,
                  question: element.question,
                  total: element.total,
                  totalCorrect: element.totalCorrect,
                  percentCorrect: element.percentCorrect
                }
                stats.push(item)
              });

          return (

          <TestQuestionPerformance stats={stats}  />

          )
        }}
      </Query>
    )
  }

}

export default TestQuestionStats
