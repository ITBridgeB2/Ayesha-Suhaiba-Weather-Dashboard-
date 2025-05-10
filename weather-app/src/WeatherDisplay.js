import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchHistory from './SearchHistory ';

function UserDashboard() {
  const [city, setCity] = useState('');
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  // Fetch search history from the backend
  useEffect(() => {
    fetch('http://localhost:9599/searches')
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error('Error loading history:', err));
  }, []);

  // Handle city search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    navigate(`/weather?city=${encodeURIComponent(city.trim())}`);
    setCity('');
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.title}>🌦️ Weather Dashboard</h1>
      </header>

      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.searchBtn}>Search</button>
      </form>

      <SearchHistory history={history} />
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    background: 'linear-gradient(to right, #e0f7fa, #b2ebf2)',
    minHeight: '100vh',
    padding: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#00695c',
    textAlign: 'center',
    flex: 1,
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  addCityBtn: {
    backgroundColor: '#00796b',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  form: {
    maxWidth: '600px',
    margin: '0 auto 2rem auto',
    backgroundColor: '#ffffffcc',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '1rem',
  },
  searchBtn: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    backgroundColor: '#1abc9c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default UserDashboard;
