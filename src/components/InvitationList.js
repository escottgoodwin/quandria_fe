import React from 'react';
import '../css/App.css';

import InvitationRow from './InvitationRow'

const InvitationList = (props) =>
<div>

  <div className="coursecontainer">
    {props.invitesSentTo.map(invite =>
      <InvitationRow key={invite.id} userid={props.userid} {...invite} />
    )}
  </div>
    </div>

export default InvitationList
