"use client"
import "./page.modules.css";
import { useEffect, useState, } from "react";
function getCurrentDate() {
  const currentDate = new Date();
  const options = { month: "long" };
  const monthName = currentDate.toLocaleString("en-US", options);
  const date = new Date().getDate() + ", " + monthName;
  return date;
}
export default function Home() {
  const date = getCurrentDate();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("lahore");

  
  async function fetchData(cityName:string) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/weather?address=" + cityName
      );
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
useEffect(()=>{
  fetchData("Lahore")
},[])
  return (
<main className="flex justify-center p-4 bg-gray-100 h-[28rem]">
  <article className="bg-white rounded-lg shadow-lg p-4 w-96">
    <form
      className="flex flex-col space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        fetchData(city);
      }}
    >
      <input
        className="input_field p-2 rounded-lg border-2 border-gray-200 focus:outline-none font-medium focus:border-blue-500"
        placeholder="Enter city name"
        type="text"
        id="cityName"
        name="cityName"
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        className="search_button bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xs"
        type="submit"
      >
        Search
      </button>
    </form>
    {weatherData && weatherData.weather && weatherData.weather[0] ? (
      <>
        <div className="icon_and_weatherInfo flex space-x-4 mt-4">
          <div className="weatherIcon text-3xl">
            {weatherData?.weather[0]?.description === "rain" ||
            weatherData?.weather[0]?.description === "fog" ? (
              <i
                className={`wi wi-day-${weatherData?.weather[0]?.description}`}
              ></i>
            ) : (
              <i className="wi wi-day-cloudy"></i>
            )}
          </div>
          <div className="weatherInfo">
            <div className="temperature text-2xl font-bold">
              <span>
                {(weatherData?.main?.temp - 273.5).toFixed(2) +
                  String.fromCharCode(176)}
              </span>
            </div>
            <div className="weatherCondition text-lg">
              {weatherData?.weather[0]?.description?.toUpperCase()}
            </div>
          </div>
          <div className="cloudIcon text-2xl absolute top-1/2 right-0 transform -translate-y-1/2">
            <i className="wi wi-cloud"></i>
          </div>
        </div>
        <div className="place text-lg font-bold mt-2">
          {weatherData?.name}
        </div>
        <div className="date text-lg mt-2">{date}</div>
        <div className="weatherDetails mt-4">
          <div className="humidity flex justify-between">
            <span className="font-medium">Humidity:</span>
            <span>{weatherData?.main?.humidity}%</span>
          </div>
          <div className="wind flex justify-between">
            <span className="font-medium">Wind:</span>
            <span>{weatherData?.wind?.speed} m/s</span>
          </div>
        </div>
      </>
    ) : (
      <div className="place text-lg font-bold mt-2">Loading...</div>
    )}
  </article>
</main>
  );
}
