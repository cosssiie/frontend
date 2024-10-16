import React from 'react';

const WeatherCard = ({ data }) => {
  return (
    <div>
      <h2>{new Date(data.time).toLocaleDateString()}</h2>
      <p>Temperature: {data.values.temperatureAvg} °C</p>
      <p>Humidity: {data.values.humidityAvg} %</p>
      <p>Wind Speed: {data.values.windSpeedAvg} m/s</p>
    </div>
  );
};

export default WeatherCard;
