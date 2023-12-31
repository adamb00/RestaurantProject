import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCart, getCartId } from '../reducers/cartReducer';
import { useUpdateCart } from '../hooks/useCart';
import GoBackOrSaveHeader from '../../../components/GoBackOrSaveHeader';

const CartExtraHeader = ({ currentFood }) => {
   const navigation = useNavigation();
   const cart = useSelector(getCart);
   const cartId = useSelector(getCartId);
   const { updateCart } = useUpdateCart();

   const handleSave = item => {
      const updatedCart = cart.map(cartItem => {
         if (cartItem.food._id === currentFood.food._id) {
            return {
               ...cartItem,
               food: { ...cartItem.food },
               message: item.message,
            };
         }

         return cartItem;
      });

      updateCart({ cartId, items: updatedCart });
      navigation.navigate('CartScreen');
   };

   return (
      <GoBackOrSaveHeader handleSave={handleSave}>
         <Text>{currentFood?.food.name}</Text>
      </GoBackOrSaveHeader>
   );
};
CartExtraHeader.propTypes = {
   currentFood: PropTypes.object,
};

export default CartExtraHeader;
