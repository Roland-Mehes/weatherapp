import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const api = axios.create({
  baseURL: url,
  params: {
    appid: apiKey,
    units: 'metric',
  },
});

export default api;
