import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getCart } from '../reducers/cartReducer';
import CartItem from '../components/CartItem';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import CartFooter from '../components/CartFooter';
import Spinner from '../../../components/Spinner';

export const Cart = () => {
   const cart = useSelector(getCart);
   const navigator = useNavigation();

   if (!cart) return <Spinner />;

   if (cart.length === 0) {
      return (
         <SafeAreaView style={styles.emptyCart}>
            <View style={styles.emptyCartContainer}>
               <Text style={styles.emptyCartMessage}>There is no item in your cart!</Text>
               <Text style={styles.emptyCartMessage}>Please add some item before finish the order</Text>
            </View>
            <Button handleSubmit={() => navigator.navigate('Order')}>Head back to foods</Button>
         </SafeAreaView>
      );
   }

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView style={styles.cartItems}>
            {cart.map((item, index) => (
               <CartItem food={item} key={item.food._id + index} />
            ))}
         </ScrollView>
         <CartFooter />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   emptyCart: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   emptyCartContainer: {
      gap: 5,
   },
   emptyCartMessage: {
      fontSize: 18,
      textAlign: 'center',
   },
   container: {
      flex: 1,
      justifyContent: 'space-between',
      marginVertical: 20,
   },
   cartItems: {
      flex: 1,
      gap: 15,
      marginVertical: 20,
      marginHorizontal: 20,
   },
});
