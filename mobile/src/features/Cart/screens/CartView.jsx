import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { getCart } from '../reducers/cartReducer';
import CartItem from '../components/CartItem';
import { style } from '../../../styles/style';

const Cart = () => {
   const cart = useSelector(getCart);
   if (!cart) return <ActivityIndicator size='large' color={style['color-primary']} />;
   return (
      <SafeAreaView style={styles.container}>
         {cart.map(item => (
            <CartItem food={item} key={item.food} />
         ))}
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({});

export default Cart;
