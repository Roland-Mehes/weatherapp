import { create } from 'zustand';
import { getCurrentWeather, getForecast, getAirQuality } from '../utils/api';
import type { WeatherData, ForecastData, AirQualityData } from './types';
import { toast } from 'react-toastify';

import getGeoLocation from '../utils/getGeoLocation';

interface WeatherState {
  weather: WeatherData | null;
  fetchWeather: (city: string) => Promise<void>;
  fetchWeatherByLocation: () => Promise<void>;
}

(async () => {
  const geoLocation = await getGeoLocation();
  if (geoLocation) console.log('GeoLocation in Store:', geoLocation.lat);
})();

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  fetchWeather: async (city: string) => {
    if (!city) return;

    const data = await getCurrentWeather(city);

    if (!data) {
      toast.error(`City ${city} not found or failed to fetch data.`);
      return;
    }

    set({ weather: data });
  },

  fetchWeatherByLocation: async () => {
    try {
      const geo = await getGeoLocation();
      if (!geo) {
        toast.error('Could not get your location.');
        return;
      }

      // ✅ helyesen, objektumként adjuk át:
      const data = await getCurrentWeather({ lat: geo.lat, lon: geo.lon });

      if (data) {
        set({ weather: data });
      } else {
        toast.error('Weather data not found for your location.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to get weather by location.');
    }
  },
}));

interface ForecastState {
  forecast: ForecastData | null;
  fetchForecast: (city: string) => Promise<void>;
}

export const useForecastStore = create<ForecastState>((set) => ({
  forecast: null,
  fetchForecast: async (city: string) => {
    if (!city) return;
    try {
      const data = await getForecast(city);
      set({ forecast: data });
    } catch (error) {
      console.error(error);
    }
  },
}));

interface AirQualityState {
  airQuality: AirQualityData | null;
  isLoading: boolean;
  lastFetchedCity: string | null;
  fetchAirQuality: (lat: number, lon: number, city: string) => Promise<void>;
}

export const useAirQualityStore = create<AirQualityState>((set, get) => ({
  airQuality: null,
  isLoading: false,
  lastFetchedCity: null,

  fetchAirQuality: async (lat, lon, city) => {
    const { lastFetchedCity } = get();
    if (lastFetchedCity === city) return; // cache

    set({ isLoading: true });
    try {
      const data = await getAirQuality(lat, lon);
      set({ airQuality: data, isLoading: false, lastFetchedCity: city });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },
}));
