import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGetAllOrder } from '../../Order/hooks/useOrder';
import Spinner from '../../../components/Spinner';
import PreviousOrderItem from '../components/PreviousOrderItem';
import { header_primary, header_secondary } from '../../../styles/style';

const PreviousOrders = () => {
   const { orders, isLoading } = useGetAllOrder();

   if (isLoading) return <Spinner />;

   return (
      <ScrollView style={{ marginVertical: 50 }}>
         <Text style={header_primary}>Previous Orders</Text>
         <Text style={[header_secondary, styles.total]}>Total: {orders.numOfOrders}</Text>

         <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
               {orders.orders.map(order => (
                  <PreviousOrderItem key={order._id} order={order} />
               ))}
            </ScrollView>
         </View>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      marginHorizontal: 30,
      marginVertical: 30,
   },
   total: {
      fontSize: 30,
      textTransform: 'capitalize',
   },
});
export default PreviousOrders;
