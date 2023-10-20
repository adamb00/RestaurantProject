import React from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getCart, getTotalCartPrice } from '../reducers/cartReducer';
import Button from '../../../components/Button';
import { style } from '../../../styles/style';
import { formatCurrency } from '../../../helpers/config';
import { useNavigation } from '@react-navigation/native';
import Spinner from '../../../components/Spinner';

const CartFooter = () => {
   const totalPrice = useSelector(getTotalCartPrice);
   const cart = useSelector(getCart);
   const navigation = useNavigation();

   const handleOrder = () => {
      if (!totalPrice || !cart) return <Spinner />;
      navigation.navigate('OrderItems');
   };

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.totalPrice}>
            <Text style={styles.totalPriceText}>
               Total Price <Text style={styles.tax}>(with taxes)</Text>:&nbsp;
            </Text>
            <Text style={styles.totalPriceValue}>{formatCurrency(totalPrice)}</Text>
         </View>
         <Button handleSubmit={handleOrder}>Order</Button>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      justifyContent: 'flex-end',
   },
   totalPrice: {
      alignItems: 'center',
      gap: 4,
      justifyContent: 'center',
      flexDirection: 'row',
      borderBottomColor: style['color-primary-shade'],
      borderBottomWidth: 1,
      paddingBottom: 10,
      marginHorizontal: 50,
   },
   totalPriceText: {
      fontSize: 18,
   },
   totalPriceValue: {
      fontSize: 18,
   },
   tax: {
      fontStyle: 'italic',
      fontSize: 16,
      color: style['color-dark-grey'],
   },
});

export default CartFooter;

CartFooter.propTypes = {};
