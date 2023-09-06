import React from 'react';
import { ScrollView } from 'react-native';

import ReservationForm from '../components/ReservationForm';
import CallBack from '../components/CallBack';

export const Reservation = () => {
   return (
      <ScrollView showsVerticalScrollIndicator={false}>
         <ReservationForm />
         <CallBack />
      </ScrollView>
   );
};
