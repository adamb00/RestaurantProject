import Toast from 'react-native-toast-message';

export const useLogoutUserIfTokenExpired = (data, singoutUser) => {
   const tokenExpirationTime = Date.now() + parseInt(data.expires, 10) * 2 * 1000;

   const checkTokenExpiration = () => {
      const currentTime = Date.now();
      if (currentTime >= tokenExpirationTime) {
         handleLogout();
      }
   };
   const tokenExpirationCheckInterval = setInterval(checkTokenExpiration, 30000);

   const handleLogout = () => {
      singoutUser();
      clearInterval(tokenExpirationCheckInterval);
      Toast.show({
         type: 'error',
         text1: 'Sorry, You have to log in again.',
      });
   };
};
