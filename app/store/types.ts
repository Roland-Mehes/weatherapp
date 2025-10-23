// /app/types/weather.ts

export interface WeatherData {
  name: string;
  dt: number;
  visibility: number;
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };

  weather: {
    main: string;
    description: string;
    icon: string;
  }[];

  sys: {
    country: string;
  };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];

  sys: {
    country: string;
  };
}

export interface ForecastData {
  list: ForecastItem[];
  city: {
    name: string;
  };
}

export interface AirQualityData {
  coord: {
    lon: number;
    lat: number;
  };
  list: {
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  }[];
}
