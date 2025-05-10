import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
  const [city, setCity] = useState('');
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  // Disable scrolling when component is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Load search history
  useEffect(() => {
    fetch('http://localhost:9599/searches')
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error('Error loading history:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    navigate(`/weather?city=${encodeURIComponent(city.trim())}`);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🌦️ User Dashboard</h1>
      </header>

      <div style={styles.bottomContent}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Search</button>
        </form>

        <div style={styles.historyBox}>
          <h3 style={styles.historyTitle}>📜 Recent Searches</h3>
          <ul style={styles.historyList}>
            {history.map((item) => (
              <li key={item.id} style={styles.historyItem}>
                <strong>{item.city}</strong> — {new Date(item.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    background: 'linear-gradient(to right, #e0f7fa, #b2ebf2)',
    minHeight: '100vh',
    overflow: 'hidden', // Redundant but safe for div-level containment
  },
  header: {
    backgroundColor: '#b2dfdb',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '2rem',
    color: '#00695c',
    margin: 0
  },
  bottomContent: {
    backgroundColor: 'white',
    padding: '2rem 1rem',
  },
  form: {
    maxWidth: '400px',
    margin: '0 auto',
    marginBottom: '1.5rem',
    padding: '1rem',
    borderRadius: '10px',
    backgroundColor: '#ffffffcc',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    fontSize: '0.9rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '0.8rem'
  },
  button: {
    width: '100%',
    padding: '0.6rem',
    fontSize: '0.9rem',
    backgroundColor: '#1abc9c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  historyBox: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '1rem',
    background: 'linear-gradient(to right, #e0f2f1, #b2dfdb)',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
  },
  historyTitle: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#00695c'
  },
  historyList: {
    listStyleType: 'none',
    padding: 0
  },
  historyItem: {
    padding: '0.4rem 0.8rem',
    marginBottom: '0.4rem',
    backgroundColor: '#ffffffcc',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    fontSize: '0.9rem'
  }
};

export default SearchForm;
