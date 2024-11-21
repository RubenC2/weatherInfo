import React from "react";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import WeatherCard from "./WeatherCard/WeatherCard";
import "./WeatherList.css";



const WeatherList = () => {

  const [city, setCity] = useState("Madrid"); // Para guardar dato inicial
  const ApiKey = import.meta.env.VITE_API_KEY;
  // const url = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}`;
  const urlCity = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${ApiKey}`;
  const [forecast, setForecast] = useState([])


  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(urlCity);
        const weatherData = res.data.list;
        setForecast(weatherData);
        setError(false); 
      } catch (e) {
        setForecast([]);
        setError(true);
      }
    }
    fetchData();
  }, [city]); //city es el estado sobre el que opera, esto no devuelve nada



  const handleSubmit = (e) => {
    e.preventDefault();
    const cityName = e.target.city.value;
    if (cityName) {
      setCity(cityName);
    } else {
      alert("Pon un nombre de ciudad.");
    }
  };

  const renderItems = () => {
    return forecast.map(
      (weatherData) => (
        <WeatherCard
          data={weatherData}
          key={weatherData.dt} 
        />
      )
    );
  };
  

  return <section className="city">
    <h1>Busca tu ciudad</h1>
    <form onSubmit={handleSubmit}>
      <input name="city" />
      <button>Buscar</button>
      
    </form>
    {renderItems()}

  </section>
};

export default WeatherList;
