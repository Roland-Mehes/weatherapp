'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWeatherStore } from '../../store/weatherStore';

const Navbar = () => {
  const [city, setCity] = useState('');
  const fetchWeather = useWeatherStore((state) => state.fetchWeather);
  const { weather, fetchWeatherByLocation } = useWeatherStore();

  const handleSearch = async () => {
    await fetchWeather(city);
    setCity('');
  };

  useEffect(() => {
    fetchWeatherByLocation();
  }, [fetchWeatherByLocation]);

  return (
    <div className="flex flex-col gap-4 md:flex-row justify-between md:items-center py-3 ">
      <Link href="/">
        <div className="flex items-center gap-3">
          <Image
            src="./logo.svg"
            alt="Logo"
            width="36"
            height="36"
            style={{ width: 36, height: 36 }}
          />
          <h1>BeWeather</h1>
        </div>
      </Link>
      <div
        className={`glassy-box flex rounded-[var(--border-radius-sm)] items-center gap-5 `}
      >
        <input
          className="p-1"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>
    </div>
  );
};

export default Navbar;
