import api from './axiosClient';
import type { AxiosError } from 'axios';

export async function getCurrentWeather(city: string) {
  try {
    const res = await api.get('/weather', {
      params: { q: city },
    });
    return res.data;
  } catch (error: unknown) {
    // check if the error is an AxiosError and if the HTTP response status is 404.
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
    return;
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
