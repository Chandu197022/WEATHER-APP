import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';    // make sure paths are correct
import WeatherChart from './WeatherChart';
import SearchBar from './SearchBar';

export default function WeatherApp() {
  const [city, setCity] = useState('Hyderabad');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // USE .env API KEY
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || "ee7c06d50a6a789600ef7204a9a7a856";

  useEffect(() => {
    fetchWeather(city);
  // eslint-disable-next-line
  }, [city]);

  const fetchWeather = async (q) => {
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&units=metric`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(weatherRes.data);
      setForecast(forecastRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setWeatherData(null);
      setForecast(null);
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Dynamic Weather Web App</h1>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
            >
              {darkMode ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
        <SearchBar onSearch={setCity} />
        {weatherData ? (
          <>
            <WeatherCard data={weatherData} />
            {forecast && <WeatherChart forecast={forecast} />}
          </>
        ) : (
          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded shadow">
            <p>No data — try another city.</p>
          </div>
        )}
      </div>
    </div>
  );
}