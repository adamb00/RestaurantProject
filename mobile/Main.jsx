import React from 'react';

import { useAuth } from './src/contexts/AuthContext';
import AuthNavigator from './src/navigator/AuthNavigator';
import HomeNavigator from './src/navigator/HomeNavigator';
import { useSelector } from 'react-redux';
import { getCart } from './src/features/Cart/reducers/cartReducer';

const Main = () => {
   const { user } = useAuth();
   const cart = useSelector(getCart);

   return <>{user ? <HomeNavigator cart={cart} /> : <AuthNavigator />}</>;
};

export default Main;
