'use client';

import WeatherCard from './components/weather/WeatherCard';
import Forecast from './components/weather/Forecast';
import SunTimes from './components/weather/SunTimes';
import AirQuality from './components/weather/AirQuality';

import { useWeatherStore } from './store/weatherStore';

export default function Home() {
  const isLoading = useWeatherStore((s) => s.loading);

  return (
    <main
      className={`w-full flex justify-center px-4 py-6 lg:py-10 
      ${isLoading ? 'opacity-50' : ''}
      `}
    >
      {/* --- MAIN CONTAINER --- */}
      <div
        className="w-full grid grid-cols-1 gap-6 
        xl:grid-cols-3
      "
      >
        {/* --- (WeatherCard) --- */}
        <section className="w-full">
          <WeatherCard />
        </section>

        {/* --- (Forecast + SunTimes + AirQuality) --- */}
        <section className="w-full flex flex-col gap-6 xl:col-span-2">
          <Forecast />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SunTimes />
            <AirQuality />
          </div>
        </section>
      </div>
    </main>
  );
}
