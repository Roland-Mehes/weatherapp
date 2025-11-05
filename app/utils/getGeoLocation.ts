import { toast } from 'react-toastify';

const getGeoLocation = async (): Promise<{
  lat: number;
  lon: number;
} | null> => {
  // SSR vagy nincs geolocation API
  if (typeof window === 'undefined' || !('geolocation' in navigator)) {
    toast.error('Geolocation is not supported (SSR or no browser API)');
    return null;
  }

  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      }
    );

    const { latitude, longitude } = position.coords;

    return { lat: latitude, lon: longitude };
  } catch (error) {
    return null;
  }
};

export default getGeoLocation;
