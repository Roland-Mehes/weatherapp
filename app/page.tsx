import WeatherCard from './components/weather/WeatherCard';
import Forecast from './components/weather/Forecast';
import SunTimes from './components/weather/SunTimes';
import AirQuality from './components/weather/AirQuality';

export default function Home() {
  return (
    <div className="p-4 inline-grid grid-cols-1 lg:grid-cols-2  gap-4">
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
