import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGetAllOrder } from '../../Order/hooks/useOrder';
import Spinner from '../../../components/Spinner';
import PreviousOrderItem from '../components/PreviousOrderItem';
import { header_primary, header_secondary } from '../../../styles/style';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../../components/Icon';

const PreviousOrders = () => {
   const { orders, isLoading } = useGetAllOrder();
   const navigation = useNavigation();

   if (isLoading) return <Spinner />;

   return (
      <ScrollView style={{ marginVertical: 50 }}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
            <Icon name='close-circle-outline' form={false} style={styles.icon} />
         </TouchableOpacity>
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

   goBack: {
      position: 'absolute',
      zIndex: 200,
      left: 10,
      top: 0,
   },
   icon: {
      fontSize: 34,
   },
});
export default PreviousOrders;
