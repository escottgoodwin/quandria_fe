import React from 'react';
import '../css/App.css';

import CourseRow from './CourseRow'

const CourseList = (props) =>
<div>
<div className="coursecontainer">
  <h4>Total Courses: {props[0].length}</h4>
</div>
  <div className="coursecontainer">
    {props[0].map(course =>
      <CourseRow key={course.id} {...course} />
    )}
  </div>
    </div>

export default CourseList
