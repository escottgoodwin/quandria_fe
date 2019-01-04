import React from 'react';
import '../css/App.css';

import StudentCourseRow from './StudentCourseRow'

const StudentList = (props) =>
<div>

  <h5>Total Courses: {props[0].length}</h5>

  <div className="coursecontainer">
    {props[0].map(course =>
      <StudentCourseRow key={course.id} {...course} />
    )}
  </div>
    </div>

export default StudentList
