import React, { createContext, useContext, useReducer, useState } from 'react';
import * as Location from 'expo-location';

import PropTypes from 'prop-types';

const LocationContext = createContext();
const initialState = { latitude: 0, longitude: 0, loading: false, errorMsg: null };

const reducer = (state, action) => {
   switch (action.type) {
      case 'setLocation': {
         return {
            ...state,
            latitude: action.payload.latitude,
            longitude: action.payload.longitude,
            isLocated: true,
            loading: false,
         };
      }
      case 'setLoading': {
         return {
            ...state,
            loading: true,
         };
      }
      case 'setErrorMsg': {
         return {
            ...state,
            errorMsg: action.payload.errorMsg,
            loading: false,
         };
      }
      default:
         throw new Error('Unkown action..');
   }
};

const LocationProvider = ({ children }) => {
   const [{ latitude, longitude, isLocated }, dispatch] = useReducer(reducer, initialState);
   const [reverseGeocodeResult, setReverseGeocodeResult] = useState(null);
   const [loading, setLoading] = useState(false);

   const setLocation = ({ latitude, longitude }) => {
      dispatch({ type: 'setLocation', payload: { latitude, longitude } });
      console.log('LOCATION STORED');
   };

   const setErrorMsg = errorMsg => {
      dispatch({ type: 'setErrorMsg', payload: { errorMsg } });
   };

   const reverseGeocode = async ({ latitude, longitude }) => {
      const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
         longitude,
         latitude,
      });

      setReverseGeocodeResult(reverseGeocodedAddress);
   };

   return (
      <LocationContext.Provider
         value={{
            latitude,
            longitude,
            loading,
            isLocated,
            setLocation,
            setLoading,
            setErrorMsg,
            reverseGeocode,
            reverseGeocodeResult,
            setReverseGeocodeResult,
         }}
      >
         {children}
      </LocationContext.Provider>
   );
};

LocationProvider.propTypes = {
   children: PropTypes.object,
};

export const useLocation = () => {
   const context = useContext(LocationContext);
   if (context === undefined) throw new Error('LocationContext was use outside LocationProvider');
   return context;
};

export { LocationContext, LocationProvider };
