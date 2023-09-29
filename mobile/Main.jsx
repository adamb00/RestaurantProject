import React from 'react';

import { useAuth } from './src/contexts/AuthContext';
import AuthNavigator from './src/navigator/AuthNavigator';
import HomeNavigator from './src/navigator/HomeNavigator';

const Main = () => {
   const { user } = useAuth();
   // const user = {
   //    createdAt: '2023-08-22T06:35:32.053Z',
   //    email: 'borsodi.dm@gmail.com',
   //    fullName: 'Adam Borsodi',
   //    phone: 36302387981,
   //    role: 'User',
   //    _id: '64e457a89ee11b494c1fba10',
   // };

   return <>{user ? <HomeNavigator /> : <AuthNavigator />}</>;
};

export default Main;
