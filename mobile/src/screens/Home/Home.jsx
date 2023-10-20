import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Welcome from '../../components/Welcome';
import Header from '../../components/Header';
import SignOut from '../../features/Auth/screens/SignOut';
import { useGetCurrentLocation } from '../../features/Order/hooks/useGetCurrentLocation';

export const Home = () => {
   useGetCurrentLocation();

   return (
      <SafeAreaView style={styles.container}>
         <Header>
            <Welcome />
            <SignOut />
         </Header>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'space-between',
   },
});
