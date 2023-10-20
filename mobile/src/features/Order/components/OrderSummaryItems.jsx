import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { formatCurrency } from '../../../helpers/config';

const OrderSummaryItems = ({ item }) => {
   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.food}>
            <View style={styles.foodNameQuantity}>
               <Text>{item.quantity}x</Text>
               <Text>{item.food.name}</Text>
            </View>
            <Text>{formatCurrency(item.food.price * item.quantity)}</Text>
         </View>
      </SafeAreaView>
   );
};

OrderSummaryItems.propTypes = {
   item: PropTypes.object,
};
const styles = StyleSheet.create({
   food: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
   },
   foodNameQuantity: {
      flexDirection: 'row',
      gap: 5,
   },
});
export default OrderSummaryItems;
