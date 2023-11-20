import React from 'react';
// import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import CouponItem from './CouponItem';
import { filterExpiredCoupons } from '../../../helpers/config';

const Coupons = () => {
   const { user } = useAuth();
   const validCoupons = filterExpiredCoupons(user.coupons);

   return (
      <SafeAreaView>
         {validCoupons.map(coupon => (
            <CouponItem key={coupon} coupon={coupon} />
         ))}
      </SafeAreaView>
   );
};

Coupons.propTypes = {};
// const styles = StyleSheet.create({});
export default Coupons;
