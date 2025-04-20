
import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  { name: 'Selling', route: '/services/selling', image: 'https://img.icons8.com/color/96/000000/shopping-cart--v1.png' },
  { name: 'Mandi Prices', route: '/services/mandi', image: 'https://img.icons8.com/color/96/000000/combo-chart--v1.png' },
  { name: 'Weather Info', route: '/services/weather', image: 'https://img.icons8.com/color/96/000000/partly-cloudy-day--v1.png' },
  { name: 'Tool Renting', route: '/services/tools', image: 'https://img.icons8.com/color/96/000000/maintenance--v1.png' },
  { name: 'Govt Schemes', route: '/services/schemes', image: 'https://img.icons8.com/color/96/000000/agreement--v1.png' },
  { name: 'Expert Advice', route: '/services/advice', image: 'https://cdn-icons-png.flaticon.com/512/3938/3938360.png' },
  { name: 'Online Courses', route: '/services/courses', image: 'https://img.icons8.com/color/96/000000/classroom--v1.png' },
  { name: 'Transport Help', route: '/services/transport', image: 'https://img.icons8.com/color/96/000000/delivery--v1.png' },
];

const Services = () => {
  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Services We Offer</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '10px',
      }}>
        {services.map((service, index) => (
          <Link to={service.route} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              border: '1px solid #ccc',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
            }}>
              <img
                src={service.image}
                alt={service.name}
                style={{ width: '100px', height: '100px', marginBottom: '10px' }}
              />
              <h3 style={{ marginTop: '15px' }}>{service.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};



export default Services;
