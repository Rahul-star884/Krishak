



import React from 'react';

const WeatherDetail = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Weather Information</h2>
      <p>Yahan se aap real-time mausam ki jankari dekh sakte hain:</p>

      <a
        href="https://mausam.imd.gov.in"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}
      >
        Visit IMD Official Weather Site
      </a>
    </div>
  );
};

export default WeatherDetail;

