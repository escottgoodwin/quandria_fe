import React from 'react';
import '../css/App.css';

import CourseRow from './CourseRow'

const CourseList = (props) =>
<div>
<div className="coursecontainer">
  Total Courses: {props.teacherCourses.length}
</div>
  <div className="coursecontainer">
    {props.teacherCourses.map((course) =>
      <CourseRow key={course.id} {...course} />
    )}
  </div>
    </div>

export default CourseList
