import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, TimeScale);

export default function WeatherChart({ forecast }) {
  const slice = forecast.list.slice(0, 8); // next 24 hours (3-hr intervals)
  const labels = slice.map(f => f.dt_txt.split(' ')[1].slice(0,5));
  const tempData = slice.map(f => f.main.temp);
  const humidityData = slice.map(f => f.main.humidity);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: tempData,
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Humidity (%)',
        data: humidityData,
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      }
    ]
  };

  return (
    <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Next 24 Hours</h3>
      <Line data={data} />
    </div>
  );
}
