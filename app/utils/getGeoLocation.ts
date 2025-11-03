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

    const { latitude, longitude, accuracy } = position.coords;
    console.log(`${accuracy} meters accuracy for geo location obtained.`);
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(
        `Lat:  ${pos.coords.latitude}, Lon : ${pos.coords.longitude}`
      );
    });
    return { lat: latitude, lon: longitude };
  } catch (error) {
    toast.error('Error getting geolocation:');
    return null;
  }
};

export default getGeoLocation;
