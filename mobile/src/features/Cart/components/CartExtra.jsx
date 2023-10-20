import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { header_quad_center, header_tertiary_center } from '../../../styles/style';
import { useGetFoods } from '../../Foods/hooks/useFood';
import { useSelector } from 'react-redux';
import { getCart } from '../reducers/cartReducer';
import CartExtraHeader from './CartExtraHeader';
import CartExtraTopping from './CartExtraTopping';
import Spinner from '../../../components/Spinner';

const CartExtra = () => {
   const route = useRoute();
   const currentFood = route.params?.foodData;
   const cart = useSelector(getCart);
   const { isLoading, foods } = useGetFoods();

   if (isLoading) return <Spinner />;

   const toppings = foods.doc.filter(food => food.type === 'topping');
   const currentFoodWithMessage = useMemo(() => {
      return cart.find(item => item.food._id === currentFood.food._id);
   }, [cart, currentFood]);

   console.log('cfwm', currentFoodWithMessage);

   console.log('c', cart);

   return (
      <SafeAreaView>
         <CartExtraHeader currentFoodWithMessage={currentFoodWithMessage} />

         <View style={styles.body}>
            <Text style={header_tertiary_center}>Add some extra to your food</Text>
            <Text style={header_quad_center}>For more complex orders, please call us 😜</Text>
            <CartExtraTopping currentFoodWithMessage={currentFoodWithMessage} toppings={toppings} />
         </View>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   body: { marginVertical: 30 },
});

export default CartExtra;
