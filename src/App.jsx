import React, { useState } from 'react';

const API_KEY = "b37e12240fb81cf758092906011f2f0c"; // Replace with your OpenWeatherMap API Key
function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      if (!res.ok) {
        throw new Error('City not found');
      }
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-extrabold text-white text-center drop-shadow-md">
          🌤️ Weather App
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name"
            className="flex-1 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
          />
          <button
            onClick={fetchWeather}
            className="px-4 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-300"
          >
            Search
          </button>
        </div>

        {loading && (
          <p className="text-center text-white/80 animate-pulse">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-300 bg-red-500/10 p-3 rounded-xl">
            {error}
          </p>
        )}

        {weatherData && (
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl text-white space-y-4 transform transition-all duration-500 hover:scale-105">
            <h2 className="text-2xl font-bold text-center">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto w-20 h-20"
            />
            <p className="text-center capitalize text-lg">
              {weatherData.weather[0].description}
            </p>
            <p className="text-5xl font-extrabold text-center">
              {kelvinToCelsius(weatherData.main.temp)}°C
            </p>

            <div className="flex justify-between mt-6 text-sm">
              <div className="text-center">
                <p className="font-semibold">Humidity</p>
                <p>{weatherData.main.humidity}%</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Wind Speed</p>
                <p>{weatherData.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;