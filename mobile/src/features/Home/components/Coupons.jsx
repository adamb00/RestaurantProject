import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import CouponItem from './CouponItem';
import { filterExpiredCoupons } from '../../../helpers/config';
import { header_primary } from '../../../styles/style';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const Coupons = ({ style }) => {
   const { user } = useAuth();
   const validCoupons = filterExpiredCoupons(user.coupons);
   const navigation = useNavigation();

   const handleOnClick = () => {
      navigation.navigate('HomeScreen');
   };

   if (validCoupons.length === 0)
      return (
         <View style={[styles.headBack, style]}>
            <Text style={header_primary}>Currently You have no coupons!</Text>
            <Button handleSubmit={handleOnClick}>Head back to Home</Button>
         </View>
      );

   return (
      <SafeAreaView>
         {validCoupons.map(coupon => (
            <CouponItem key={coupon} coupon={coupon} />
         ))}
      </SafeAreaView>
   );
};

Coupons.propTypes = {
   style: PropTypes.object,
};

const styles = StyleSheet.create({
   headBack: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
   },
});

export default Coupons;
