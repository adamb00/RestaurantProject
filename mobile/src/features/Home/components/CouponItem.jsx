import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shadowProp, style } from '../../../styles/style';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '../../../components/Icon';
import { useDispatch } from 'react-redux';
import { setCoupon } from '../../Cart/reducers/cartReducer';

const CouponItem = ({ coupon }) => {
   const dispatch = useDispatch();
   const handleOnPress = () => {
      dispatch(setCoupon(coupon));
   };
   return (
      <SafeAreaView>
         <TouchableOpacity disabled={!coupon.active} onPress={handleOnPress}>
            <View style={shadowProp}>
               <LinearGradient
                  style={styles.couponContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={
                     coupon.active
                        ? [style['color-primary'], style['color-primary-tint']]
                        : [style['color-dark-grey'], style['color-dark-grey-2']]
                  }
               >
                  <Icon name='gift-outline' form={false} style={coupon.active ? styles.icon : styles.iconInactive} />
                  <Text style={coupon.active ? styles.name : styles.nameInactive}>{coupon.name} </Text>
                  <View style={styles.discountContainer}>
                     <Text style={coupon.active ? styles.discount : styles.discountInactive}>
                        Your total discount is:
                     </Text>
                     <Text style={coupon.active ? styles.discountItem : styles.discountItemInactive}>
                        {coupon.discount}%
                     </Text>
                  </View>
                  {!coupon.active && <Text style={styles.inactive}>You already used this coupon!</Text>}
               </LinearGradient>
            </View>
         </TouchableOpacity>
      </SafeAreaView>
   );
};

CouponItem.propTypes = {
   coupon: PropTypes.object,
};
const styles = StyleSheet.create({
   couponContainer: {
      borderRadius: style['default-border-radius'],
      padding: 20,
      margin: 30,
      gap: 10,
      position: 'relative',
   },

   inactive: {
      textAlign: 'center',
      fontSize: 12,
      fontStyle: 'italic',
      color: style['color-light-grey-2'],
   },

   icon: {
      position: 'absolute',
      color: style['color-secondary-tint'],
      fontSize: 40,
      margin: 15,
   },

   iconInactive: {
      position: 'absolute',
      color: style['color-primary'],
      fontSize: 40,
      margin: 15,
   },
   name: {
      textAlign: 'center',
      fontSize: 26,
      color: style['color-secondary-shade'],
   },

   nameInactive: {
      textAlign: 'center',
      fontSize: 26,
      color: style['color-light-grey-2'],
   },

   discountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
   },
   discount: {
      fontSize: 22,
      color: style['color-secondary-shade'],
   },
   discountInactive: {
      fontSize: 22,
      color: style['color-light-grey-2'],
   },

   discountItem: {
      fontSize: 26,
      color: style['color-secondary-tint'],
   },

   discountItemInactive: {
      fontSize: 26,
      color: style['color-light-grey-2'],
   },
});
export default CouponItem;
