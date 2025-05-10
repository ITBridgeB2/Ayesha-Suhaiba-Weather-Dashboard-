import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchForm from './SearchForm ';
import WeatherPage from './WeatherPage'; // ✅ Don't forget this!

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchForm />} />
       <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
