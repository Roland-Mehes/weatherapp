'use client';

import Image from 'next/image';
import { useWeatherStore } from '@/app/store/weatherStore';
import iconMap from '@/app/constants/iconMap';
import { BiLoader } from 'react-icons/bi';

const WeatherCard = () => {
  const weatherData = useWeatherStore((state) => state.weather);

  if (!weatherData)
    return (
      <div className="glassy-box rounded p-4 flex items-center gap-2 w-32 justify-center">
        <BiLoader />
      </div>
    );

  const currentTime = weatherData.dt
    ? new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date(weatherData.dt * 1000))
    : '';

  return (
    <div className="inline-flex flex-col glassy-container items-center text-center gap-6">
      <div className="grid gap-2">
        <h3>
          {weatherData.name}, {weatherData.sys.country}
        </h3>
        <p>{currentTime}</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        {/* Adaptive img from the API for the actual weather  */}
        {weatherData.weather[0] && (
          <Image
            src={iconMap[weatherData.weather[0].icon]}
            alt={weatherData.weather[0].description}
            width={100}
            height={100}
            style={{ width: 100, height: 100 }}
          />
        )}
        <h1 className="text-7xl">{Math.round(weatherData.main.temp)}°</h1>
        <h3>{weatherData.weather.map((w) => w.main).join(', ')}</h3>
        <p>Feels like {Math.round(weatherData.main.feels_like)}°</p>
      </div>

      <div className="grid grid-cols-2 gap-4 ">
        <WeatherStats>
          <Image
            src="./wind.svg"
            alt="wind"
            width={20}
            height={20}
            style={{ width: 20, height: 20 }}
          />
          <div>Wind</div>
          {weatherData.wind.speed} km/h
        </WeatherStats>

        <WeatherStats>
          <Image
            src="./drop.svg"
            alt="Humidity"
            width={20}
            height={20}
            style={{ width: 20, height: 20 }}
          />
          <div>Humidity</div>
          <p>{weatherData.main.humidity}%</p>
        </WeatherStats>

        <WeatherStats>
          <Image
            src="./pressure.svg"
            alt="Pressure"
            width={20}
            height={20}
            style={{ width: 20, height: 20 }}
          />
          <div>Pressure</div>
          <p>{weatherData.main.pressure} hpa</p>
        </WeatherStats>

        <WeatherStats>
          <Image
            src="./visibility.svg"
            alt="Visibility"
            width={20}
            height={20}
            style={{ width: 20, height: 20 }}
          />
          <div>Visibility</div>
          {weatherData.visibility / 1000} km
        </WeatherStats>
      </div>
    </div>
  );
};

export default WeatherCard;

const WeatherStats: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="glassy-box rounded-2xl px-8 py-4 grid place-items-center">
      {children}
    </div>
  );
};
