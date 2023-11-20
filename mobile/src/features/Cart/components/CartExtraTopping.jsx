import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import Icon from '../../../components/Icon';
import { header_quad_center, header_tertiary_center, shadowProp, style } from '../../../styles/style';
import { useDispatch } from 'react-redux';
import { increaseCartExtras, decreaseCartExtras, updateFoodMessage } from '../reducers/cartReducer';
import { useCalculateCurrentExtrasQuantity } from '../hooks/useCalcucateCurrentExtrasQuantity';
import { useGetFoods } from '../../Foods/hooks/useFood';

import { formatCurrency } from '../../../helpers/config';
import Spinner from '../../../components/Spinner';
import UserInput from '../../../components/UserInput';
import { useForm } from 'react-hook-form';

const CartExtraTopping = ({ currentFood }) => {
   const dispatch = useDispatch();
   const { foods } = useGetFoods();
   const { control } = useForm();

   const toppings = foods.doc.filter(food => food.type === 'topping');
   let { currentExtrasQuantity } = useCalculateCurrentExtrasQuantity(currentFood, toppings);

   if (!currentExtrasQuantity) currentExtrasQuantity = toppings.map(() => 0);

   const [updatedQuantities, setUpdatedQuantities] = useState(currentExtrasQuantity);

   const handleIncrease = (topping, index) => {
      const updated = [...updatedQuantities];
      updated[index] += 1;
      setUpdatedQuantities(updated);
      dispatch(increaseCartExtras({ topping, currentFood }));
   };

   const handleDecrease = (topping, index) => {
      if (updatedQuantities[index] === 0) return;

      const updated = [...updatedQuantities];
      updated[index] -= 1;
      setUpdatedQuantities(updated);
      dispatch(decreaseCartExtras({ topping, currentFood }));
   };

   const handleOnChangeText = item => {
      dispatch(updateFoodMessage({ foodId: currentFood.food._id, message: item }));
   };

   if (!currentFood) return <Spinner />;

   return (
      <View>
         <Text style={header_tertiary_center}>Add some extra to your food</Text>
         <Text style={header_quad_center}>For more complex orders, please call us 😜</Text>
         <View style={[styles.shadow, shadowProp]}>
            <UserInput
               placeholder='Do you have any extra wish?'
               control={control}
               name='orderMessage'
               initialValue={currentFood?.message}
               onChangeText={handleOnChangeText}
            />
         </View>
         <ScrollView>
            {toppings.map((item, index) => (
               <View style={styles.container} key={item._id}>
                  <Text style={styles.itemText}>
                     {item.name} &nbsp;
                     <Text style={styles.priceText}>(+{formatCurrency(item.price)})</Text>
                  </Text>
                  {updatedQuantities[index] === 0 ? (
                     <TouchableOpacity onPress={() => handleIncrease(item, index)}>
                        <Icon name='add-circle' form={false} style={styles.icon} />
                     </TouchableOpacity>
                  ) : (
                     <View style={styles.modifyQuantity}>
                        <TouchableOpacity onPress={() => handleDecrease(item, index)}>
                           <Icon name='remove-circle-outline' form={false} style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={[styles.itemText, styles.quantity]}>{updatedQuantities[index]}</Text>
                        <TouchableOpacity onPress={() => handleIncrease(item, index)}>
                           <Icon name='add-circle' form={false} style={styles.icon} />
                        </TouchableOpacity>
                     </View>
                  )}
               </View>
            ))}
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   modifyQuantity: {
      display: 'flex',
      flexDirection: 'row',
      gap: 15,
      alignItems: 'center',
   },
   quantity: {
      color: style['color-primary'],
   },
   shadow: {
      marginVertical: 10,
      backgroundColor: style['color-light-grey'],
      marginHorizontal: 10,
      borderRadius: style['default-border-radius'],
   },

   container: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      borderBottomColor: style['color-primary-shade'],
      borderBottomWidth: 1,
      marginVertical: 10,
      paddingBottom: 5,
   },
   itemText: {
      fontSize: 18,
      color: style['color-secondary-shade'],
   },
   priceText: {
      fontSize: 14,
      fontStyle: 'italic',
      letterSpacing: 0.8,
   },
   icon: {
      color: style['color-primary-tint'],
      fontSize: 30,
   },
});

CartExtraTopping.propTypes = {
   currentFood: PropTypes.object,
   toppings: PropTypes.array,
};
export default CartExtraTopping;
