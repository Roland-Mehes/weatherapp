'use client';
import WeatherCard from './components/weather/WeatherCard';
import Forecast from './components/weather/Forecast';
import SunTimes from './components/weather/SunTimes';
import AirQuality from './components/weather/AirQuality';

import { useWeatherStore } from './store/weatherStore';

export default function Home() {
  const isLoading = useWeatherStore((s) => s.loading);

  return (
    <div
      className={`p-3 grid grid-cols-1 lg:grid-cols-2  gap-4
    ${isLoading ? 'opacity' : ''}
    
    `}
    >
      <WeatherCard />
      <div className="flex flex-col gap-4 ">
        <Forecast />
        <div className="grid md:grid-cols-2 gap-6">
          <SunTimes />
          <AirQuality />
        </div>
      </div>
    </div>
  );
}
