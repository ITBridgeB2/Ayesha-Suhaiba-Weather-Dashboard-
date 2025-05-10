import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const city = new URLSearchParams(location.search).get('city');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (!city) return;

    fetch(`http://localhost:9599/weather/${encodeURIComponent(city)}`)
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error('Error fetching weather:', err));
  }, [city]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>🌍 {city}</h1>
        <button style={styles.homeBtn} onClick={() => navigate('/')}>Home</button>
      </header>

      <div style={styles.bottomContent}>
        {weather ? (
          <div style={styles.infoContainer}>
            <p><strong>🌡️ Temperature:</strong> {weather.temperature}°C</p>
            <p><strong>💧 Humidity:</strong> {weather.humidity}%</p>
            <p><strong>🌥️ Condition:</strong> {weather.weather}</p>
          </div>
        ) : (
          <p style={styles.loading}>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    background: 'linear-gradient(to right, #e0f7fa, #b2ebf2)',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#b2dfdb',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    borderRadius: '0 0 12px 12px'
  },
  heading: {
    fontSize: '2rem',
    color: '#00695c',
    margin: 0
  },
  homeBtn: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#b2dfdb', // matches the header
    color: '#00695c',
    border: '1px solid #00695c',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  bottomContent: {
    backgroundColor: 'white',
    padding: '2rem 1rem',
    minHeight: 'calc(100vh - 80px)'
  },
  infoContainer: {
    backgroundColor: '#ffffffcc',
    padding: '2rem',
    borderRadius: '16px',
    maxWidth: '500px',
    margin: '0 auto',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    fontSize: '1.1rem',
    lineHeight: '1.8'
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.3rem',
    marginTop: '3rem',
    color: '#00695c'
  }
};

export default WeatherPage;
