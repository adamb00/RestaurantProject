import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../features/Auth/screens/SignIn';
import SignUpScreen from '../features/Auth/screens/SignUp';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false, gestureDirection: 'vertical' }}>
         <Stack.Screen name='SignIn' component={SignInScreen} />
         <Stack.Screen name='SignUp' component={SignUpScreen} />
      </Stack.Navigator>
   );
};

export default AuthNavigator;
