const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'itbridge'
});



// Fetch weather by city name
app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  if (!city) return res.status(400).json({ error: "City name is required" });

  try {
    db.execute(
      'SELECT * FROM searches WHERE city = ? ORDER BY timestamp DESC LIMIT 1',
      [city],
      async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error", details: err });

        if (results.length > 0) {
          const cached = results[0];
          if (cached.temperature && cached.humidity && cached.weather) {
            return res.status(200).json({
              city: cached.city,
              temperature: cached.temperature,
              humidity: cached.humidity,
              weather: cached.weather
            });
          }
        }

        const apiKey = process.env.OPENWEATHER_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await axios.get(apiUrl);

        const { name, main, weather } = response.data;

        db.execute(
          'INSERT INTO searches (city, humidity, weather, temperature, timestamp) VALUES (?, ?, ?, ?, NOW())',
          [name, main.humidity, weather[0].main, main.temp],
          (insertErr) => {
            if (insertErr) return res.status(500).json({ error: "Database insertion error", details: insertErr });

            res.status(200).json({
              city: name,
              temperature: main.temp,
              humidity: main.humidity,
              weather: weather[0].main
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(404).json({ error: "City not found or API error", details: error.message });
  }
});

// Get recent searches
app.get('/searches', (req, res) => {
  db.execute('SELECT * FROM searches ORDER BY timestamp DESC', (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.status(200).json(results);
  });
});

app.listen('9599');
console.log(`✅ Server running on 9599`);
