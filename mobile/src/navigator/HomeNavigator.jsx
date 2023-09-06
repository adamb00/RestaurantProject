import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';

import { Home as HomeScreen } from '../screens/Home/Home';
import { Order as OrderScreen } from '../features/Order/Screens/Order';
import { More as MoreScreen } from '../screens/More/More';
import { Reservation as ReservationScreen } from '../features/Reservation/screens/Reservation';
import { style } from '../styles/style';
import Icon from '../components/Icon';
import FoodInfo from '../features/Foods/components/FoodInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const OrderStack = () => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false, gestureDirection: 'vertical' }}>
         <Stack.Screen name='Home' component={OrderScreen} />
         <Stack.Screen name='FoodInfo' component={FoodInfo} />
      </Stack.Navigator>
   );
};

const HomeNavigator = () => {
   return (
      <Tab.Navigator
         initialRouteName='Home'
         screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
               let iconName;

               if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
               } else if (route.name === 'Order') {
                  iconName = focused ? 'pizza' : 'pizza-outline';
               } else if (route.name === 'Reservation') {
                  iconName = focused ? 'book' : 'book-outline';
               } else if (route.name === 'More') {
                  iconName = focused ? 'reorder-four' : 'reorder-four-outline';
               }
               return <Icon name={iconName} form={false} focused={focused} />;
            },
            headerShown: false,
            tabBarActiveTintColor: style['color-primary'],
            tabBarInactiveTintColor: style['color-secondary-tint'],
         })}
      >
         <Tab.Screen name='Home' component={HomeScreen} />
         <Tab.Screen name='Order' component={OrderStack} />
         <Tab.Screen name='Reservation' component={ReservationScreen} />
         <Tab.Screen name='More' component={MoreScreen} />
      </Tab.Navigator>
   );
};

export default HomeNavigator;
