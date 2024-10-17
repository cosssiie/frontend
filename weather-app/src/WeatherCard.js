import React from 'react';
import './Dashboard.css';


const WeatherCard = ({ data }) => {
  const weatherIcon = getWeatherIcon(data.values.cloudCoverAvg, data.values.precipitationProbabilityAvg, data.values.precipitationType);

  return (
      <div className="card">
        <img src={weatherIcon} alt="Weather Icon" />
        <h2>{new Date(data.time).toLocaleDateString()}</h2>
        <p>Max temperature: {data.values.temperatureMax} °C</p>
        <p>Min temperature: {data.values.temperatureMin} °C</p>
        <p>Humidity: {data.values.humidityAvg} %</p>
        <p>Wind Speed: {data.values.windSpeedAvg} m/s</p>
      </div>
  );
};

function getWeatherIcon(cloudCoverAvg, precipitationProbabilityAvg, precipitationType) {
  if (cloudCoverAvg >= 80) {
    if (precipitationProbabilityAvg > 0.0254) {
      switch (precipitationType) {
        case 1: 
          return "/images/rainy-day.png";
        case 2:
          return "/images/snowfall.png";
        default:
          return "/images/cloud.png";
      }
    }
    return "/images/cloud.png";
  } else if (cloudCoverAvg >= 30) {
    return "/images/sun-and-cloud.png";
  } else if (cloudCoverAvg < 30) {
    return "/images/yellow-sun.png";
  } 
}


export default WeatherCard;
