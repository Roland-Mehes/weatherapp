import { create } from 'zustand';
import { getCurrentWeather, getForecast, getAirQuality } from '../utils/api';
import type { WeatherData, ForecastData, AirQualityData } from './types';
import { toast } from 'react-toastify';

import getGeoLocation from '../utils/getGeoLocation';

interface WeatherState {
  weather: WeatherData | null;
  loading: boolean;
  fetchWeather: (city: string) => Promise<void>;
  fetchWeatherByLocation: () => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  loading: false,
  fetchWeather: async (city: string) => {
    if (!city) return;

    set({ loading: true });

    try {
      const data = await getCurrentWeather(city);
      if (!data) {
        toast.error(`City ${city} not found or failed to fetch data.`);
        return;
      }
      set({ weather: data });
    } finally {
      set({ loading: false });
    }
  },

  fetchWeatherByLocation: async () => {
    set({ loading: true });
    try {
      const geo = await getGeoLocation();

      if (!geo) {
        const data = await getCurrentWeather('Bucharest');
        if (data) {
          set({ weather: data });
        }
        toast.info('Could not get your location, showing Bukarest.');
        return;
      }

      // Fetch weather data using the obtained geolocation
      const data = await getCurrentWeather({ lat: geo.lat, lon: geo.lon });

      if (data) {
        set({ weather: data });
      } else {
        toast.error('Weather data not found for your location.');
        const fallbackData = await getCurrentWeather('Bucharest');
        if (fallbackData) {
          set({ weather: fallbackData });
        }
      }
    } catch (error) {
      toast.error('Failed to get weather by location.');
      const fallbackData = await getCurrentWeather('Bucharest');
      if (fallbackData) {
        set({ weather: fallbackData });
      }
    } finally {
      set({ loading: false });
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
