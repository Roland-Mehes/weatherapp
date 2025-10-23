'use client';
import { useWeatherStore } from '@/app/store/weatherStore';
import Image from 'next/image';

interface SunTimesProps {
  sys: {
    sunrise: number;
    sunset: number;
  };
}

const SunTimes = () => {
  const weatherData = useWeatherStore(
    (state) => state.weather
  ) as SunTimesProps | null;

  if (!weatherData) return <div className="glassy-box p-4">No data</div>;

  const sunriseDate = new Date(weatherData.sys.sunrise * 1000);
  const sunsetDate = new Date(weatherData.sys.sunset * 1000);
  const timeSettings: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return (
    <div className="glassy-box rounded-[var(--border-radius-md)] px-5 py-10 flex flex-col gap-4">
      <h4>Sun Times</h4>
      <div className="flex justify-between">
        <span className="flex gap-2 relative items-center text-[1rem]">
          <Image src="/questionmark.svg" alt="icon" width={24} height={24} />
          Sunrise
        </span>
        <h4> {sunriseDate.toLocaleTimeString('en-GB', timeSettings)}</h4>
      </div>

      <div className="flex justify-between ">
        <span className="flex gap-2 relative items-center text-[1rem]">
          <Image src="/questionmark.svg" alt="icon" width={24} height={24} />
          Sunset
        </span>
        <h4> {sunsetDate.toLocaleTimeString('en-GB', timeSettings)}</h4>
      </div>
    </div>
  );
};

export default SunTimes;
