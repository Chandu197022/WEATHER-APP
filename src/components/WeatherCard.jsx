import React from 'react';

export default function WeatherCard({ data }) {
  return (
    <div className="mt-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{data.name}, {data.sys?.country}</h2>
          <p className="capitalize">{data.weather[0].description}</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-semibold">{Math.round(data.main.temp)}°C</p>
          <p className="text-sm">Feels like {Math.round(data.main.feels_like)}°C</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
        <div>Humidity: {data.main.humidity}%</div>
        <div>Pressure: {data.main.pressure} hPa</div>
        <div>Wind: {data.wind.speed} m/s</div>
      </div>
    </div>
  );
}
