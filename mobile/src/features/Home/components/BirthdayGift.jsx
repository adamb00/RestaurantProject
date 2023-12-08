import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { shadowProp, style } from '../../../styles/style';
import { useAuth } from '../../../contexts/AuthContext';
import voucher_codes from 'voucher-code-generator';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useUpdateUser } from '../../Auth/hooks/useUserAuth';

const BirthdayGift = ({ setUserAlreadyGetBirthdayCoupon }) => {
   const { user } = useAuth();
   const navigation = useNavigation();
   const { updateUser } = useUpdateUser();

   const voucher = voucher_codes.generate({
      length: 1,
      count: 1,
      charset: ' ',
      prefix: 'Happy',
      postfix: 'Birthday',
   });

   const coupon = [
      new Object({ name: voucher[0], discount: 20, expires: Date.now() + 1000 * 60 * 60 * 24, active: true }),
   ];
   const coupons = [...user.coupons, ...coupon];

   const handleOnClick = () => {
      setUserAlreadyGetBirthdayCoupon(item => !item);
      updateUser({ ...user, coupons });
      navigation.navigate('Coupons');
   };

   return (
      <SafeAreaView style={[styles.container, shadowProp]}>
         <Text style={styles.wrapperText}>Happy Birthday {user.fullName.split(' ')[1]} 🥳🥳</Text>
         <Text style={styles.wrapperText}>We would like to surprise You today! 🤩</Text>
         <View>
            <Button handleSubmit={handleOnClick}>Click me!</Button>
         </View>
      </SafeAreaView>
   );
};

BirthdayGift.propTypes = {
   setUserAlreadyGetBirthdayCoupon: PropTypes.func,
};
const styles = StyleSheet.create({
   container: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: style['color-light-grey'],
      borderRadius: style['default-border-radius'],
      margin: 20,
      gap: 20,
      paddingVertical: 20,

      minHeight: 200,
   },
   wrapperText: {
      fontSize: 18,
   },
});
export default BirthdayGift;
