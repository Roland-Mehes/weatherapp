import api from './axiosClient';
import type { AxiosError } from 'axios';

type CityOrCoords = string | { lat: number; lon: number };

export async function getCurrentWeather(cityOrCoords: CityOrCoords) {
  try {
    const isCoords = typeof cityOrCoords !== 'string';

    const params = isCoords
      ? { lat: cityOrCoords.lat, lon: cityOrCoords.lon }
      : { q: cityOrCoords };

    const res = await api.get('/weather', { params });
    return res.data;
  } catch (error: unknown) {
    const err = error as AxiosError;

    if (err?.response?.status === 404) {
      return null;
    }

    console.error('getCurrentWeather error:', error);
    return null;
  }
}

export async function getForecast(city: string) {
  try {
    const res = await api.get('/forecast', {
      params: { q: city },
    });
    return res.data;
  } catch (error) {
    console.error('getForecast error:', error);
    throw new Error('Failed to fetch forecast data');
  }
}

export async function getAirQuality(lat: number, lon: number) {
  try {
    const res = await api.get('/air_pollution', {
      params: { lat, lon },
    });
    return res.data;
  } catch (error) {
    console.error('getAirQuality error:', error);
    throw new Error('Failed to fetch air quality data');
  }
}
