import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useGetFoods } from '../../Foods/hooks/useFood';

import CartExtraHeader from './CartExtraHeader';
import CartExtraTopping from './CartExtraTopping';
import Spinner from '../../../components/Spinner';

const CartExtra = () => {
   const route = useRoute();
   const currentFood = route.params?.foodData;
   const { isLoading, foods } = useGetFoods();

   if (isLoading) return <Spinner />;

   const toppings = foods.doc.filter(food => food.type === 'topping');

   return (
      <SafeAreaView>
         <CartExtraHeader currentFood={currentFood} />
         <View style={styles.body}>
            <CartExtraTopping currentFood={currentFood} toppings={toppings} />
         </View>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   body: { marginVertical: 30 },
});

export default CartExtra;
