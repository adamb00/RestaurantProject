import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getCart } from '../reducers/cartReducer';

const Cart = () => {
   const cart = useSelector(getCart);
   return (
      <SafeAreaView style={styles.container}>
         {cart.map(item => (
            <View key={item._id}>
               <Text>{item.name}</Text>
               <Text>{item.quantity}</Text>
            </View>
         ))}
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({});

export default Cart;
