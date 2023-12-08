import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import React from 'react';

import { Home as HomeScreen } from '../features/Home/screens/Home';
import { Order as OrderScreen } from '../features/Order/screens/Order';
import { Reservation as ReservationScreen } from '../features/Reservation/screens/Reservation';
import { Cart as CartScreen } from '../features/Cart/screens/Cart';

import { style } from '../styles/style';
import Icon from '../components/Icon';

import FoodInfo from '../features/Foods/components/FoodInfo';
import CartExtra from '../features/Cart/components/CartExtra';
import OrderItems from '../features/Order/components/OrderItems';
import EditOrderAddress from '../features/Order/components/EditOrderAddress';
import Coupons from '../features/Home/components/Coupons';
import PreviousOrders from '../features/Home/screens/PreviousOrders';
import PreviousOrderItemCurrent from '../features/Home/components/PreviousOrderItemCurrent';
import Settings from '../features/Home/screens/Settings';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false, gestureDirection: 'Horizontal' }}>
         <Stack.Screen name='HomeScreen' component={HomeScreen} />
         <Stack.Screen name='Coupons' component={Coupons} />
         <Stack.Screen name='PreviousOrders' component={PreviousOrders} />
         <Stack.Screen name='PreviousOrderItemCurrent' component={PreviousOrderItemCurrent} />
         <Stack.Screen name='FoodInfo' component={FoodInfo} />
         <Stack.Screen name='Settings' component={Settings} />
      </Stack.Navigator>
   );
};

const OrderStack = () => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false, gestureDirection: 'vertical' }}>
         <Stack.Screen name='OrderScreen' component={OrderScreen} />
         <Stack.Screen name='FoodInfo' component={FoodInfo} />
         <Stack.Screen name='CartExtra' component={CartExtra} />
      </Stack.Navigator>
   );
};

const CartStack = () => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false, gestureDirection: 'vertical' }}>
         <Stack.Screen name='CartScreen' component={CartScreen} />
         <Stack.Screen name='FoodInfo' component={FoodInfo} />
         <Stack.Screen name='CartExtra' component={CartExtra} />
         <Stack.Screen name='OrderItems' component={OrderItems} />
         <Stack.Screen name='EditOrderAddress' component={EditOrderAddress} />
      </Stack.Navigator>
   );
};

const HomeNavigator = () => {
   return (
      <View style={styles.container}>
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
                  } else if (route.name === 'Cart') {
                     iconName = focused ? 'cart' : 'cart-outline';
                  }
                  return <Icon name={iconName} form={false} focused={focused} />;
               },

               headerShown: false,
               tabBarActiveTintColor: style['color-primary'],
               tabBarInactiveTintColor: style['color-secondary-tint'],
            })}
         >
            <Tab.Screen name='Home' component={HomeStack} />
            <Tab.Screen name='Order' component={OrderStack} />
            <Tab.Screen name='Reservation' component={ReservationScreen} />
            <Tab.Screen name='Cart' component={CartStack} />
         </Tab.Navigator>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      position: 'relative',
   },
   cartContainer: {
      position: 'absolute',
      bottom: 100,
      right: 20,
      backgroundColor: 'transparent',
      borderColor: style['color-primary'],
      borderWidth: 1,
      borderRadius: 100,
      padding: 10,
   },
   cart: {
      fontSize: 24,
      color: style['color-primary'],
   },
});

export default HomeNavigator;
