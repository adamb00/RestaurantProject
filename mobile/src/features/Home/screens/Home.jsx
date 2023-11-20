import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { useGetCurrentLocation } from '../../Order/hooks/useGetCurrentLocation';
import { useAuth } from '../../../contexts/AuthContext';
import BirthdayBox from '../components/BirthdayBox';
import BirthdayGift from '../components/BirthdayGift';
import { LinearGradient } from 'expo-linear-gradient';
import { style } from '../../../styles/style';
import Icon from '../../../components/Icon';
import Sidebar from '../components/Sidebar';
import { useSidebar } from '../hooks/useSidebar';
import TopFavoriteFoods from '../components/TopFavoriteFoods';
import { useUserHasBirthdayCoupon } from '../hooks/useUserHasBirthdayCoupon';

export const Home = () => {
   useGetCurrentLocation();
   const { user } = useAuth();

   const today = new Date(Date.now());
   const userBday = new Date(user.birthday);
   const { handleOnPress, sidebarIsOpen, sidebarPosition, setSidebarIsOpen } = useSidebar();

   const closeSidebar = () => {
      if (sidebarIsOpen) {
         setSidebarIsOpen(false);
      }
   };

   const { userAlreadyGetBirthdayCoupon, setUserAlreadyGetBirthdayCoupon } = useUserHasBirthdayCoupon(user);

   return (
      <View>
         <LinearGradient
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[style['color-primary'], style['color-primary-tint']]}
         >
            <Icon name='menu-outline' handleOnPress={handleOnPress} style={styles.icon} />
         </LinearGradient>
         {sidebarIsOpen && <Sidebar sidebarPosition={sidebarPosition} closeSidebar={closeSidebar} />}
         <SafeAreaView style={styles.container}>
            {!user.birthday && <BirthdayBox sidebarIsOpen={sidebarIsOpen} />}
            {!userAlreadyGetBirthdayCoupon &&
               userBday.getMonth() === today.getMonth() &&
               userBday.getDay() === today.getDay() && (
                  <BirthdayGift setUserAlreadyGetBirthdayCoupon={setUserAlreadyGetBirthdayCoupon} />
               )}
            <TopFavoriteFoods />
         </SafeAreaView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {},
   header: {
      height: 110,
      alignContent: 'center',
   },
   icon: {
      marginTop: 50,
      marginLeft: 20,
      zIndex: 1000,
      color: style['color-secondary-tint'],
      fontSize: 35,
      borderWidth: 0,
      borderColor: 'transparent',
   },
});
