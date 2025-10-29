import React, { useState } from "react";
import {
  FaSearch,
  FaTemperatureHigh,
  FaWind,
  FaTint,
  FaCloud,
} from "react-icons/fa";
import "./index.css";
import logo from "./logo.jpg";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError(null);
      } else {
        setWeatherData(null);
        setError(data.message);
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="app">
      <div className="weather-card">
        
        {/* 🌤️ Header with Logo */}
        <header className="app-header">
          <img src={logo} alt="Site Logo" className="site-logo" />
        </header>

        <h1 className="title">Dynamic Weather Web App</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>
            <FaSearch />
          </button>
        </div>

        {error && <p className="error">⚠️ {error}</p>}

        {weatherData ? (
          <div className="weather-info">
            <h2 className="city-name">{weatherData.name}</h2>
            <p className="temp">
              <FaTemperatureHigh /> {weatherData.main.temp}°C
            </p>
            <p>
              <FaTint /> Humidity: {weatherData.main.humidity}%
            </p>
            <p>
              <FaWind /> Wind: {weatherData.wind.speed} m/s
            </p>
            <p>
              <FaCloud /> {weatherData.weather[0].description}
            </p>
          </div>
        ) : (
          !error && <p className="placeholder">Search for any city 🌎</p>
        )}
      </div>
    </div>
  );
}
