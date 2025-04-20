

import React from 'react';

const MandiDetails = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Market price information</h2>
      <p>Click the button below to know the latest market rates.</p>
      
      <a
        href="https://agmarknet.gov.in/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <div style={{
          marginTop: '20px',
          display: 'inline-block',
          padding: '15px 30px',
          backgroundColor: '#4caf50',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transition: '0.3s',
          cursor: 'pointer'
        }}>
          Mandi Rate (Agmarknet)
        </div>
      </a>
    </div>
  );
};

export default MandiDetails;
