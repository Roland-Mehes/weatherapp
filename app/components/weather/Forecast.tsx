'use client';

import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import { useForecastStore, useWeatherStore } from '@/app/store/weatherStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import iconMap from '@/app/constants/iconMap';

const Forecast = () => {
  const forecast = useForecastStore((state) => state.forecast);
  const fetchForecast = useForecastStore((state) => state.fetchForecast);
  const weather = useWeatherStore((state) => state.weather);

  useEffect(() => {
    if (weather?.name) {
      fetchForecast(weather.name);
    }
  }, [fetchForecast, weather?.name]);

  // Filter for days
  const dailyForecast = useMemo(() => {
    if (!forecast?.list) return [];

    const seenDays = new Set<string>();

    return forecast.list.filter((item) => {
      const day = new Date(item.dt * 1000).toLocaleDateString('en-GB', {
        weekday: 'long',
      });

      if (seenDays.has(day)) return false;
      seenDays.add(day);
      return true;
    });
  }, [forecast]);

  if (!weather) return;

  return (
    <div className="glassy-box rounded-[var(--border-radius-md)] p-5 overflow-hidden">
      <h2 className="mb-4">5- Day Forecast</h2>

      {dailyForecast.length > 0 ? (
        <Swiper
          spaceBetween={15}
          slidesPerView={4.5}
          breakpoints={{
            320: { slidesPerView: 2.2 },
            480: { slidesPerView: 2.8 },
            640: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {dailyForecast.map((day) => (
            <SwiperSlide key={day.dt}>
              <div className="glassy-box !border-0 rounded-xl flex flex-col items-center  py-3 px-2 h-auto  w-full md:max-w-[100px] lg:max-w-[140px] ">
                <p className="font-semibold">
                  {new Intl.DateTimeFormat('en-GB', {
                    weekday: 'short',
                  }).format(new Date(day.dt * 1000))}
                </p>

                <div className="w-[64px] h-[64px] flex items-center justify-center relative">
                  {day.weather[0] && (
                    <Image
                      src={iconMap[day.weather[0].icon]}
                      alt={day.weather[0].description}
                      height={30}
                      width={36}
                      className="object-contain"
                    />
                  )}
                </div>

                <h4>{Math.round(day.main.temp)}°</h4>
                <h5>{Math.round(day.main.feels_like)}°</h5>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No forecast yet.</p>
      )}
    </div>
  );
};
export default Forecast;
