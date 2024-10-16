import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const API_KEY = '44YYCJgoXOMw1F2D0MDLCNi0W20KIWKt';
      try {
        const response = await axios.get(`https://api.tomorrow.io/v4/weather/forecast?location=Kyiv&apikey=${API_KEY}`);
        console.log(response.data);
        setWeatherData(response.data.timelines?.daily || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };
    
    fetchWeatherData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      {Array.isArray(weatherData) && weatherData.length > 0 ? (
        weatherData.map((day, index) => (
          <WeatherCard key={index} data={day} />
        ))
      ) : (
        <div>No weather data available</div>
      )}
    </div>
  );
}

export default Dashboard;
