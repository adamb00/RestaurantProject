import { useEffect } from 'react';
import * as Location from 'expo-location';
import { useLocation } from '../../../contexts/LocationContext';

export const useGetCurrentLocation = () => {
   const { setLocation, setErrorMsg, setLoading, reverseGeocode } = useLocation();
   const { userLocation, errorMsg } = useLocation();

   useEffect(() => {
      const getPermission = async () => {
         try {
            setLoading(true);

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
               setErrorMsg('Permission to access location was denied.');
               setLoading(false);
               return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
            reverseGeocode(currentLocation.coords);
            setLoading(false);
         } catch (error) {
            setErrorMsg('Error getting location: ' + error.message);
            setLoading(false);
         }
      };
      getPermission();
   }, []);

   return { userLocation, errorMsg, reverseGeocode };
};
