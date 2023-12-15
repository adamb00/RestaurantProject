import { useEffect } from 'react';
import { APP_ID } from '../../../../config.json';

import * as Facebook from 'expo-auth-session/providers/facebook';
import { useLoginUser, useLogoutUser } from './useUserAuth';
import { useAuth } from '../../../contexts/AuthContext';
import Toast from 'react-native-toast-message/lib';
import { useLogoutUserIfTokenExpired } from './useLogoutUserIfTokenExpired';
import { useGetCurrentLocation } from '../../Order/hooks/useGetCurrentLocation';

export const useFacebookLogin = () => {
   const [request, response, promptAsync] = Facebook.useAuthRequest({ clientId: APP_ID });
   const { loginUser } = useLoginUser();
   const { signin } = useAuth();
   const { singoutUser } = useLogoutUser();
   const { reverseGeocodeResult } = useGetCurrentLocation();

   useEffect(() => {
      if (response && response.type === 'success' && response.authentication) {
         const fetchUserInfo = async () => {
            try {
               const userInfoResponse = await fetch(
                  `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=email,name,friends,picture.type(large)`
               );
               const userInfo = await userInfoResponse.json();

               console.log(reverseGeocodeResult);
               const mapFacebookUserToIUser = facebookUser => {
                  const user = {
                     fullName: facebookUser.name,
                     address: {
                        city: reverseGeocodeResult[0].city,
                        postalCode: reverseGeocodeResult[0].postalCode,
                        street: reverseGeocodeResult[0].street,
                        streetNumber: reverseGeocodeResult[0].streetNumber,
                     },
                     email: facebookUser.email,
                     phone: facebookUser.phone,
                     birthday: facebookUser.birthday,
                     type: 'facebook',
                  };
                  return user;
               };

               console.log(userInfo);

               const user = mapFacebookUserToIUser(userInfo);

               loginUser(
                  { ...user },
                  {
                     onSuccess: data => {
                        if (data.status === 'error') {
                           Toast.show({
                              type: 'error',
                              text1: data.message,
                           });
                        } else {
                           signin(data);
                           useLogoutUserIfTokenExpired(data, singoutUser);
                        }
                     },
                     onError: error => {
                        console.error(error.message);
                     },
                  }
               );
               useLogoutUserIfTokenExpired(user, singoutUser);
            } catch (error) {
               console.error('Error fetching user info:', error);
            }
         };

         fetchUserInfo();
      }
   }, [response, reverseGeocodeResult]);

   return { request, response, promptAsync };
};
