import React from 'react';
import '../css/App.css';

import CourseRow from './CourseRow'

const CourseList = (props) =>
<div>

  <h5>Total Courses: {props[0].length}</h5>

  <div className="coursecontainer">
    {props[0].map(course =>
      <CourseRow key={course.id} {...course} />
    )}
  </div>
    </div>

export default CourseList
