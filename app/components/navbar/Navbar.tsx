'use client';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { TbRefresh } from 'react-icons/tb';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWeatherStore } from '../../store/weatherStore';

const Navbar = () => {
  const [city, setCity] = useState('');

  const fetchWeather = useWeatherStore((state) => state.fetchWeather);
  const { fetchWeatherByLocation } = useWeatherStore();

  const handleSearch = async () => {
    await fetchWeather(city);
  };

  useEffect(() => {
    fetchWeatherByLocation();
  }, [fetchWeatherByLocation]);

  return (
    <div
      className={`flex flex-col md:flex-row md:justify-between md:items-center mt-4 w-full gap-4 md:gap-10 md:px-10  px-3 
        `}
    >
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

      <div className=" w-full md:w-auto flex place-items-center gap-4">
        <div className="relative w-full md:w-64 ">
          <input
            className="p-2 glassy-box rounded-[var(--border-radius-sm)] focus:outline-none w-full"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2"
            onClick={handleSearch}
          >
            <HiMagnifyingGlass size={20} />
          </button>
        </div>
        <div className="glassy-box rounded-xl py-1.5 px-1 ">
          <TbRefresh
            size={25}
            className="hover:-rotate-35 transition cursor-pointer"
            onClick={() => handleSearch()}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
