import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { useGetOneFood } from '../../Foods/hooks/useFood';
import UpdateItemQuantity from './UpdateItemQuantity';
import { useSelector } from 'react-redux';
import { getCartId } from '../reducers/cartReducer';
import Spinner from 'react-native-loading-spinner-overlay';

const CartItem = ({ food }) => {
   const cartId = useSelector(getCartId);
   const { isLoading, currentFood } = useGetOneFood(food.food);

   if (isLoading)
      return (
         <View>
            <Spinner />
         </View>
      );

   if (!currentFood)
      return (
         <View>
            <Spinner />
         </View>
      );
   const { doc: currentFoodData } = currentFood;

   return (
      <View>
         <Text>{currentFoodData.name}</Text>
         <UpdateItemQuantity food={currentFoodData} currentQuantity={food.quantity} cartId={cartId} />
         <Text>{currentFoodData.price * food.quantity}</Text>
      </View>
   );
};

CartItem.propTypes = {
   food: PropTypes.object,
};

export default CartItem;
