import React from 'react'
import { Table } from 'semantic-ui-react'

import ChallengeNavRow from '../components/ChallengeNavRow'

const ChallengeDList = props =>

    <Table celled selectable>

      <Table.Body>
        {
          props.challenges.map(challenge =>
          <ChallengeNavRow key={challenge.id}  changeChallenge={props.changeChallenge} {...challenge} test_id={props.test_id} />)
        }

     </Table.Body>

    </Table>

export default ChallengeDList
