
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.heroContainer}>
      <h1 style={styles.heading}>Empowering Rural India</h1>
      <p style={styles.subtext}>Connecting farmers and artisans to the world</p>
      <button style={styles.button} onClick={() => navigate('/services')}>
        Services We Offer
      </button>
    </div>
  );
};

const styles = {
  heroContainer: {
    height: '80vh',
    backgroundImage: 'url("https://www.pixelstalk.net/wp-content/uploads/2016/06/Minimalist-HD-Backgrounds.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  heading: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textShadow: '2px 2px 4px #000'
  },
  subtext: {
    fontSize: '20px',
    marginBottom: '30px',
    textShadow: '1px 1px 2px #000'
  },
  button: {
    backgroundColor: '#ff6600',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default Home;
