import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from '../../../components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, getCart, increase, deleteItem, setCartId, getCartId } from '../reducers/cartReducer';
import PropTypes from 'prop-types';
import { useUpdateCart, useDeleteCart } from '../hooks/useCart';

const UpdateItemQuantity = ({ food, currentQuantity }) => {
   const dispatch = useDispatch();
   const cart = useSelector(getCart);
   const cartId = useSelector(getCartId);
   const { updateCart } = useUpdateCart();
   const { deleteCart } = useDeleteCart();

   async function handleIncrease() {
      const existingItem = cart.find(
         item => item.food._id === food._id && (food.type === 'pizza' ? item.food.size === food.size : true)
      );

      if (existingItem) {
         if (food.type === 'pizza') {
            const newQuantity = existingItem.quantity + 1;
            dispatch(increase(existingItem.food));
            await updateCartOnServer([...cart], existingItem.food._id, existingItem.food.size, newQuantity, cartId);
         } else {
            const newQuantity = existingItem.quantity + 1;
            dispatch(increase(existingItem.food));
            await updateCartOnServer([...cart], existingItem.food._id, null, newQuantity, cartId);
         }
      }
   }

   async function handleDecrease() {
      const existingItem = cart.find(
         item => item.food._id === food._id && (food.type === 'pizza' ? item.food.size === food.size : true)
      );

      if (existingItem && existingItem.quantity > 1) {
         if (food.type === 'pizza') {
            const newQuantity = existingItem.quantity - 1;
            dispatch(decrease(existingItem.food));
            await updateCartOnServer([...cart], existingItem.food._id, existingItem.food.size, newQuantity, cartId);
         } else {
            const newQuantity = existingItem.quantity - 1;
            dispatch(decrease(existingItem.food));
            await updateCartOnServer([...cart], existingItem.food._id, null, newQuantity, cartId);
         }
      } else if (existingItem && existingItem.quantity === 1) {
         if (food.type === 'pizza') {
            dispatch(deleteItem(existingItem.food));
            await updateCartOnServer([...cart], existingItem.food._id, existingItem.food.size, 0, cartId);
         } else {
            dispatch(deleteItem(existingItem.food));
            await updateCartOnServer([...cart], existingItem.food._id, null, 0, cartId);
         }
      }
   }

   const updateCartOnServer = async (currentCart, foodId, size, newQuantity) => {
      try {
         const updatedCart = currentCart.map(item => {
            if (item.food._id === foodId && item.food.size === size) {
               const updatedItem = { ...item, quantity: newQuantity };
               return updatedItem;
            }
            return item;
         });

         const allQuantitiesAreZero = updatedCart.every(item => item.quantity === 0);

         if (allQuantitiesAreZero) {
            dispatch(setCartId(''));
            deleteCart(cartId);
         } else {
            updateCart({
               cartId,
               items: updatedCart,
            });
         }
      } catch (error) {
         console.error('Error updating cart on server:', error);
      }
   };

   return (
      <View style={styles.container}>
         <TouchableOpacity onPress={handleDecrease}>
            <Icon name='remove-circle-outline' form={false} />
         </TouchableOpacity>
         <Text>{currentQuantity}</Text>
         <TouchableOpacity onPress={handleIncrease}>
            <Icon name='add-circle-outline' form={false} />
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
   },
});

UpdateItemQuantity.propTypes = {
   food: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string,
      size: PropTypes.string,
   }),
   currentQuantity: PropTypes.number.isRequired,
};

export default UpdateItemQuantity;
