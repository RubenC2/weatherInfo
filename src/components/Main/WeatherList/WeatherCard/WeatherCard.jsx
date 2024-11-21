import React from "react";
import "./WeatherCard.css";



const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <h3>{data.dt_txt}</h3> {/* Fecha y hora */}
      <p>Temperatura: {data.main.temp}°C</p> {/* Temperatura */}
      <p>Descripción: {data.weather[0].description}</p> {/* Descripción */}
    </div>
  );
};

export default WeatherCard;
