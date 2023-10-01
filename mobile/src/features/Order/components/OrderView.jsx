import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { style } from '../../../styles/style';
import { useGetFoods } from '../../Foods/hooks/useFood';
import Spinner from 'react-native-loading-spinner-overlay';
import FoodItem from '../../Foods/components/FoodItem';
import { useScrollTo } from '../hooks/useScrollTo';
import { useDispatch, useSelector } from 'react-redux';
import { additem, getCart, getCartId, setCart, setCartId } from '../../Cart/reducers/cartReducer';
import { useCreateCart, useUpdateCart } from '../../Cart/hooks/useCart';
import { useGetCurrentUserCart } from '../hooks/useGetCurrentUserCart';

const OrderView = ({ types, scrollTo }) => {
   const screenHeight = Dimensions.get('window').height;
   const dispatch = useDispatch();

   const { foods } = useGetFoods();
   const { scrollViewRef } = useScrollTo(scrollTo, types);

   const { createCart } = useCreateCart();
   const { updateCart } = useUpdateCart();

   const cart = useSelector(getCart);
   const cartId = useSelector(getCartId);

   useGetCurrentUserCart();

   const handleAddToCart = async food => {
      dispatch(additem(food._id));

      if (!cartId) {
         createCart(
            { items: [{ food: food._id, quantity: 1 }] },
            {
               onSuccess: data => {
                  if (data) {
                     dispatch(setCartId(data.doc._id));
                     dispatch(setCart(data.doc.items));
                  }
               },
            }
         );
      } else {
         const existingItem = cart.find(item => item._id === food._id);

         if (existingItem) {
            existingItem.quantity++;

            updateCart({ cartId, items: [{ food: existingItem._id }] });
         } else {
            updateCart({ cartId, items: [...cart, { food: food._id, quantity: 1 }] });
         }
      }
   };

   if (!foods) {
      return (
         <View>
            <Spinner />
         </View>
      );
   }

   return (
      <ScrollView style={{ height: screenHeight * 0.7 }} ref={scrollViewRef} showsVerticalScrollIndicator={false}>
         {types.map(type => (
            <View key={type} style={styles.typeContainer}>
               <Text style={styles.header_type}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
               {foods.doc
                  .filter(food => food.type === type)
                  .map(
                     food =>
                        food.isAvailable && (
                           <FoodItem food={food} key={food._id} handleAddToCart={handleAddToCart} cartId={cartId} />
                        )
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
};

export default OrderView;
