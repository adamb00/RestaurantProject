import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { style } from '../../../styles/style';
import FoodItem from '../../Foods/components/FoodItem';
import { useScrollTo } from '../hooks/useScrollTo';
import { useDispatch, useSelector } from 'react-redux';
import { additem, getCart, getCartId, increase, setCartId } from '../../Cart/reducers/cartReducer';
import { useCreateCart, useUpdateCart } from '../../Cart/hooks/useCart';
import { useGetCurrentUserCart } from '../hooks/useGetCurrentUserCart';

const OrderView = ({ types, scrollTo, foods }) => {
   const screenHeight = Dimensions.get('window').height;
   const dispatch = useDispatch();

   const { scrollViewRef } = useScrollTo(scrollTo, types);

   const { createCart } = useCreateCart();
   const { updateCart } = useUpdateCart();

   const cartId = useSelector(getCartId);
   const cart = useSelector(getCart);
   useGetCurrentUserCart();

   const handleAddToCart = async food => {
      const existingItem = cart.find(item => item.food._id === food._id) ?? null;

      if (!existingItem) {
         dispatch(additem(food));
      } else {
         dispatch(increase(existingItem.food));
      }

      if (!cartId) {
         createCart(
            { items: [{ food, quantity: 1 }] },
            {
               onSuccess: data => {
                  if (data) {
                     dispatch(setCartId(data.doc._id));
                  }
               },
            }
         );
      } else {
         let updatedCart = [...cart];

         const existingCartItemIndex = updatedCart.findIndex(item => item.food._id === food._id);

         if (existingCartItemIndex !== -1) {
            updatedCart[existingCartItemIndex].quantity++;
         } else {
            updatedCart.push({ food, quantity: 1 });
         }

         updateCart({ cartId, items: updatedCart });
      }
   };

   return (
      <ScrollView style={{ height: screenHeight * 0.7 }} ref={scrollViewRef} showsVerticalScrollIndicator={false}>
         {types.map(type => (
            <View key={type} style={styles.typeContainer}>
               <Text style={styles.header_type}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
               {foods.doc
                  .filter(food => food.type === type)
                  .map(
                     food =>
                        food.isAvailable && <FoodItem food={food} key={food._id} handleAddToCart={handleAddToCart} />
                  )}
            </View>
         ))}
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   typeContainer: {
      marginVertical: 50,
   },
   header_type: {
      fontSize: 26,
      marginHorizontal: 10,
      marginBottom: 30,
      color: style['color-secondary-shade'],
   },
});

OrderView.propTypes = {
   types: PropTypes.array,
   scrollTo: PropTypes.string,
   foods: PropTypes.object,
};

export default OrderView;
