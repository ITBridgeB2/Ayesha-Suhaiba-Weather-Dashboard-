import React from 'react';

function SearchHistory({ history }) {
  return (
    <div style={{
      maxWidth: '600px', margin: '2rem auto', padding: '1.5rem',
      background: 'linear-gradient(to right, #e0f2f1, #b2dfdb)', borderRadius: '16px',
      boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center', color: '#00695c' }}>
        📜 Recent Searches
      </h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {history.map((item) => (
          <li key={item.id} style={{
            padding: '0.6rem 1rem', marginBottom: '0.5rem',
            backgroundColor: '#ffffffcc', borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}>
            <strong>{item.city}</strong> — {new Date(item.timestamp).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;
