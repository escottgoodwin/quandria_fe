import React from 'react';
import '../css/App.css';

import TestRow from './TestRow'

const TestList = (props) =>
  <div className="coursecontainer">
  {props[0].map(test =>
    <TestRow key={test.id} {...test} />
    )}
  </div>

export default TestList
