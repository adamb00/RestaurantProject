import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from '../../../components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, getCart, increase, deleteItem, setCartId } from '../reducers/cartReducer';
import PropTypes from 'prop-types';
import { useUpdateCart, useDeleteCart } from '../hooks/useCart';

const UpdateItemQuantity = ({ food, currentQuantity, cartId }) => {
   const dispatch = useDispatch();
   const cart = useSelector(getCart);
   const { updateCart } = useUpdateCart();
   const { deleteCart } = useDeleteCart();

   async function handleDecrease() {
      const existingItem = cart.find(item => item.food === food._id);

      if (existingItem && existingItem.quantity > 1) {
         dispatch(decrease(existingItem.food));
         await updateCartOnServer([...cart], existingItem.food, currentQuantity - 1, cartId);
      } else if (existingItem && existingItem.quantity === 1) {
         dispatch(deleteItem(existingItem.food));
         await updateCartOnServer([...cart], existingItem.food, 0, cartId);
      }
   }

   async function handleIncrease() {
      const existingItem = cart.find(item => item.food === food._id);

      if (existingItem) {
         dispatch(increase(existingItem.food));
         await updateCartOnServer([...cart], existingItem.food, currentQuantity + 1, cartId);
      }
   }

   const updateCartOnServer = async (currentCart, food, newQuantity) => {
      try {
         const updatedCart = currentCart.map(item => {
            if (item.food === food) {
               return { ...item, quantity: newQuantity };
            }
            return item;
         });

         const allQuantitiesAreZero = updatedCart.every(item => item.quantity === 0);

         if (allQuantitiesAreZero) {
            dispatch(setCartId(''));
            deleteCart(cartId);
         }

         updateCart({
            cartId,
            items: updatedCart,
         });
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
   food: PropTypes.object,
   currentQuantity: PropTypes.number,
   cartId: PropTypes.string,
};

export default UpdateItemQuantity;
