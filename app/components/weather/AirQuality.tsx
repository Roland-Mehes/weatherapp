'use client';

import { useEffect } from 'react';
import { useWeatherStore, useAirQualityStore } from '@/app/store/weatherStore';

// AQI categories
const AQI_CATEGORIES = [
  {
    label: 'Good',
    range: [0, 50],
    color: '#22C55E',
    desc: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
  },
  {
    label: 'Moderate',
    range: [51, 100],
    color: '#EAB308',
    desc: 'Air quality is acceptable; however, there may be a concern for some people who are unusually sensitive.',
  },
  {
    label: 'Unhealthy for Sensitive Groups',
    range: [101, 150],
    color: '#F97316',
    desc: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
  },
  {
    label: 'Unhealthy',
    range: [151, 200],
    color: '#EF4444',
    desc: 'Everyone may begin to experience health effects; sensitive groups may experience more serious effects.',
  },
  {
    label: 'Very Unhealthy',
    range: [201, 300],
    color: '#8B5CF6',
    desc: 'Health alert: everyone may experience more serious health effects.',
  },
  {
    label: 'Hazardous',
    range: [301, 500],
    color: '#7E22CE',
    desc: 'Health warnings of emergency conditions. The entire population is more likely to be affected.',
  },
];

// Helper function for calculating AQI for individual components
function calculateAQI(
  C: number,
  breakpoints: [number, number, number, number][]
): number | null {
  for (const [Clow, Chigh, Ilow, Ihigh] of breakpoints) {
    if (C >= Clow && C <= Chigh) {
      return ((Ihigh - Ilow) / (Chigh - Clow)) * (C - Clow) + Ilow;
    }
  }
  return null;
}

// PM2.5, PM10, O3 thresholds (US EPA)
const PM25_BREAKPOINTS: [number, number, number, number][] = [
  [0.0, 12.0, 0, 50],
  [12.1, 35.4, 51, 100],
  [35.5, 55.4, 101, 150],
  [55.5, 150.4, 151, 200],
  [150.5, 250.4, 201, 300],
  [250.5, 500.4, 301, 500],
];

const PM10_BREAKPOINTS: [number, number, number, number][] = [
  [0, 54, 0, 50],
  [55, 154, 51, 100],
  [155, 254, 101, 150],
  [255, 354, 151, 200],
  [355, 424, 201, 300],
  [425, 604, 301, 500],
];

const O3_BREAKPOINTS: [number, number, number, number][] = [
  [0.0, 0.054, 0, 50],
  [0.055, 0.07, 51, 100],
  [0.071, 0.085, 101, 150],
  [0.086, 0.105, 151, 200],
  [0.106, 0.2, 201, 300],
];

const AirQuality = () => {
  const weatherData = useWeatherStore((state) => state.weather);
  const { airQuality, fetchAirQuality, isLoading, lastFetchedCity } =
    useAirQualityStore();

  useEffect(() => {
    if (
      weatherData?.coord &&
      weatherData.name &&
      weatherData.name !== lastFetchedCity
    ) {
      fetchAirQuality(
        weatherData.coord.lat,
        weatherData.coord.lon,
        weatherData.name
      );
    }
  }, [weatherData?.coord, weatherData?.name, lastFetchedCity, fetchAirQuality]);

  if (isLoading) {
    return <div className="glassy-box p-4">Loading air quality...</div>;
  }

  if (!airQuality) {
    return;
  }

  const c = airQuality.list[0].components;

  // O3 convert µg/m³ → ppm
  const o3ppm = c.o3 / 1960;

  // Individual AQI calculations
  const pm25AQI = calculateAQI(c.pm2_5, PM25_BREAKPOINTS);
  const pm10AQI = calculateAQI(c.pm10, PM10_BREAKPOINTS);
  const o3AQI = calculateAQI(o3ppm, O3_BREAKPOINTS);

  // The final AQI is the highest value
  const finalAQI = Math.round(Math.max(pm25AQI ?? 0, pm10AQI ?? 0, o3AQI ?? 0));

  // Determine the category
  const category =
    AQI_CATEGORIES.find(
      (cat) => finalAQI >= cat.range[0] && finalAQI <= cat.range[1]
    ) ?? AQI_CATEGORIES[AQI_CATEGORIES.length - 1];

  return (
    <div className="glassy-box rounded-[var(--border-radius-md)] px-5 py-6 flex flex-col gap-3">
      <h4>Air Quality</h4>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl font-semibold">{finalAQI}</span>
          <span
            className="text-[12px] py-1 px-2 rounded-full "
            style={{ backgroundColor: category.color }}
          >
            {category.label}
          </span>
        </div>
      </div>

      <p className="text-sm opacity-70">{category.desc}</p>
    </div>
  );
};

export default AirQuality;
