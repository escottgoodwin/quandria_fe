import React,{Component} from 'react';
import '../css/App.css';
import ChallengeHeader from '../components/ChallengeHeader'
import PanelList from '../components/PanelList'
import AddPanelButton from '../components/AddPanelButton'
import { Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'
import gql from "graphql-tag";


const PANEL_QUERY = gql`
query TestChallenges($test_id:ID!){
  test(id:$test_id){
    id
      subject
      testNumber
      testDate
      course{
        id
        name
        courseNumber
      }
      panels{
        link
        questions{
         question
         questionAnswers{
           answerCorrect
         }
        }
      }
   }
}
`



class StudentPerformance extends Component {

  render() {
    const { test_id } = this.props.location.state

      return (


      <Query query={PANEL_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error />

              const testToRender = data.test

          return (
<div className="main">


    <div className="container">

      <ChallengeHeader {...testToRender}/>

      <div style={{padding:'15px'}}>


      <h5>{testToRender.panels.length} Panels</h5>

      <AddPanelButton {...testToRender}/>

      <div className="coursecontainer">

      <PanelList {...testToRender}/>

      </div>
    </div>


</div>
</div>
)
}


}
</Query>
)
}
}



export default StudentPerformance ;
