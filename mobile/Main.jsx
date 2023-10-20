import React from 'react';

import { useAuth } from './src/contexts/AuthContext';
import AuthNavigator from './src/navigator/AuthNavigator';
import HomeNavigator from './src/navigator/HomeNavigator';
import { useSelector } from 'react-redux';
import { getCart } from './src/features/Cart/reducers/cartReducer';

const Main = () => {
   const { user } = useAuth();
   const cart = useSelector(getCart);
   // const user = {
   //    createdAt: '2023-08-22T06:35:32.053Z',
   //    email: 'borsodi.dm@gmail.com',
   //    fullName: 'Adam Borsodi',
   //    phone: 36302387981,
   //    role: 'User',
   //    _id: '64e457a89ee11b494c1fba10',
   //    address: null,
   // };

   return <>{user ? <HomeNavigator cart={cart} /> : <AuthNavigator />}</>;
};

export default Main;
