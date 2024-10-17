import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import './Dashboard.css';
import styled, { keyframes } from 'styled-components';


const Dashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const API_KEY = '44YYCJgoXOMw1F2D0MDLCNi0W20KIWKt';
      try {
        const response = await axios.get(
          `https://api.tomorrow.io/v4/weather/forecast?location=Kyiv&apikey=${API_KEY}`
        );
        console.log(response.data);
        setWeatherData(response.data.timelines?.daily || []);
      } catch (error) {
        window.alert('Error fetching weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <Loading>
        <H1>Loading</H1>
        <Spinner />
      </Loading>
    );
  }

  return (
    <div id="container">
      <header>
        <div className="head">
          <h1>Weather</h1>
          <div className="searchBar">
            <input id="searchInput" type="text" placeholder="" />
            <button className="search" id="searchBtn">Search</button>
          </div>
        </div>

        <div className="navigation">
          <nav>
            <ul>
              <li><a href="#">Cities</a></li>
              <li><a href="#">Weather Map</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="location">
        <h2>Ukraine, Kyiv</h2>
      </div>

      <div className="weatherCards">
        {Array.isArray(weatherData) && weatherData.length > 0 ? (
          weatherData.map((day, index) => (
            <WeatherCard key={index} data={day} />
          ))
        ) : (
          <div>No weather data available</div>
        )}
      </div>
    </div>

  );
};

const H1 = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 20px;
  color: #3498db;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
  background-color: #f0f0f0;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotate} 1s linear infinite;
`;

export default Dashboard;
