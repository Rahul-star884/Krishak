


import React from 'react';

const courses = [
  {
    title: 'Introduction to Sustainable Farming',
    platform: 'FutureLearn',
    description: 'Learn the basics of organic and sustainable farming practices.',
    link: 'https://www.futurelearn.com/courses/sustainable-farming',
  },
  {
    title: 'Soil and Water Conservation Engineering',
    platform: 'NPTEL (IIT)',
    description: 'Covers techniques to conserve soil and water for Indian farms.',
    link: 'https://nptel.ac.in/courses/126105008',
  },
  {
    title: 'Agriculture Marketing',
    platform: 'SWAYAM',
    description: 'Learn how to sell farm products effectively in the market.',
    link: 'https://swayam.gov.in/nd1_noc20_mg23/preview',
  },
  {
    title: 'Organic Farming Certification Course',
    platform: 'AgMOOCs',
    description: 'Certified training on organic farming practices.',
    link: 'https://www.agmoocs.in/',
  },
];

const CoursesDetails = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Online Agriculture Courses</h2>
      {courses.map((course, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            backgroundColor: '#eefdf0',
          }}
        >
          <h3>{course.title}</h3>
          <p><strong>Platform:</strong> {course.platform}</p>
          <p><strong>Description:</strong> {course.description}</p>
          <a href={course.link} target="_blank" rel="noopener noreferrer">
            View Course
          </a>
        </div>
      ))}
    </div>
  );
};

export default CoursesDetails;