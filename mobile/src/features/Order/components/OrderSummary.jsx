import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { header_tertiary, style } from '../../../styles/style';
import Icon from '../../../components/Icon';
import { useSelector } from 'react-redux';
import {
   getCart,
   getExtrasTotalPrice,
   getFoodsTotalPrice,
   getTotalItemsQuantity,
} from '../../Cart/reducers/cartReducer';
import OrderSummaryItems from './OrderSummaryItems';
import { DELIVERY_PRICE, WRAPPING_PRICE, formatCurrency } from '../../../helpers/config';

const OrderSummary = ({ discount, totalPrice }) => {
   const cart = useSelector(getCart);
   const extrasPrice = useSelector(getExtrasTotalPrice);
   const foodsPrice = useSelector(getFoodsTotalPrice);
   const wrappingPrice = useSelector(getTotalItemsQuantity) * WRAPPING_PRICE;

   return (
      <SafeAreaView>
         <View style={styles.container}>
            <View style={styles.header}>
               <Icon form={false} name='reader-outline' />
               <Text style={header_tertiary}>Summary</Text>
            </View>
            <View style={styles.food}>
               {cart.map((item, index) => (
                  <OrderSummaryItems item={item} key={item.food._id + index} />
               ))}
            </View>
            <View style={styles.dataContainer}>
               <Text>Total food price:</Text>
               <Text>{formatCurrency(foodsPrice)}</Text>
            </View>
            <View style={styles.dataContainer}>
               <Text>Wrapping:</Text>
               <Text>{formatCurrency(wrappingPrice)}</Text>
            </View>
            <View style={styles.dataContainer}>
               <Text>Extras:</Text>
               <Text>{formatCurrency(extrasPrice)}</Text>
            </View>
            <View style={styles.dataContainer}>
               <Text>Delivery Price:</Text>
               <Text>{formatCurrency(DELIVERY_PRICE)}</Text>
            </View>
            {discount && (
               <View style={styles.dataContainer}>
                  <Text>Discount:</Text>
                  <Text>{formatCurrency((totalPrice / 100) * discount)}</Text>
               </View>
            )}
         </View>
      </SafeAreaView>
   );
};

OrderSummary.propTypes = {
   discount: PropTypes.number,
   totalPrice: PropTypes.number,
};
const styles = StyleSheet.create({
   container: {
      padding: 20,
      marginHorizontal: 20,
      marginVertical: 50,
      backgroundColor: style['color-light-grey'],
      position: 'relative',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
   },

   food: {
      marginVertical: 20,
      borderBottomWidth: style['default-boder-width'],
      borderBottomColor: style['color-light-grey-2'],
   },
   dataContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
   },
});
export default OrderSummary;
