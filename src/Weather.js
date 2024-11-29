import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Weather({ cityData }) {
  const [data, setData] = useState({
    celsius: cityData?.defaultTemperature || 10,
    name: cityData?.defaultCity || "Toronto",
    humidity: 10,
    speed: 2,
    image: "/Images/clear.png",
    weatherCondition: "Clear",
  });

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=84709c1d5012e25ef73a9e833536ce30&&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          const weatherMain = res.data.weather[0]?.main || "Unknown";
          let imagePath = "/Images/clear.png";

          switch (weatherMain) {
            case "Clouds":
              imagePath = "/Images/cloud.png";
              break;
            case "Clear":
              imagePath = "/Images/clear.png" ;
              break;
            case "Rain":
              imagePath = "/Images/rain.png";
              break;
            case "Drizzle":
              imagePath = "/Images/drizzle.png";
              break;
            case "Fog":
              imagePath = "/Images/foggy.png";
              break;
            case "Mist":
              imagePath = "/Images/mist.png";
              break;
            case "Snow":
              imagePath = "/Images/snow.png";
              break;
            default:
              imagePath = "/Images/clear.png";
              break;
          }
          console.log(res.data);
          setData({
            ...data,
            celsius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
            weatherCondition: weatherMain,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response?.status == 404) {
            setError("Invalid City Name");
          } else {
            setError("Unable to fetch weather data. Try again later");
          }
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleClick}>
            <img src="/Images/search.png" alt="Search" />
          </button>
        </div>
        <div className="error">
          <p> {error} </p>
        </div>
        <div className="weather-info">
          <img src={data.image} alt="" className="icon" />
          <h1>{Math.round(data.celsius)}°C</h1>
          <h2>{data.name}</h2>
          <div className="weather-condition">
            <p>{data.weatherCondition}</p>
          </div>
          <div className="details">
            <div className="col">
              <img src="/Images/humidity.png" alt="" />
              <div className="humidity">
                <p>{data.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className="col">
              <img src="/Images/wind.png" alt="" />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
