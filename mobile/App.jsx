import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
// import { useFonts } from 'expo-font';
// import { AppLoading } from 'expo';

import Main from './Main';
import { AuthProvider } from './src/contexts/AuthContext';

const queryClient = new QueryClient();

const App = () => {
   // const [fontsLoaded] = useFonts({
   //    DancingScript: require('./assets/fonts/DancingScript-VariableFont_wght.ttf'),
   //    Farsan: require('./assets/fonts/Farsan-Regular.ttf'),
   // });

   // if (!fontsLoaded) return <AppLoading />;

   return (
      <QueryClientProvider client={queryClient}>
         <AuthProvider>
            <NavigationContainer>
               <Main />
               <Toast />
            </NavigationContainer>
         </AuthProvider>
      </QueryClientProvider>
   );
};

export default App;
