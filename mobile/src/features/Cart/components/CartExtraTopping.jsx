import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import Icon from '../../../components/Icon';
import { shadowProp, style } from '../../../styles/style';
import { useDispatch } from 'react-redux';
import { increaseCartExtras, decreaseCartExtras } from '../reducers/cartReducer';
import { useCalculateCurrentExtrasQuantity } from '../hooks/useCalcucateCurrentExtrasQuantity';
import { useGetFoods } from '../../Foods/hooks/useFood';
import { useGetCurrentUserCart } from '../../Order/hooks/useGetCurrentUserCart';

import { formatCurrency } from '../../../helpers/config';
import Spinner from '../../../components/Spinner';
import UserInput from '../../../components/UserInput';
import { useForm } from 'react-hook-form';

const CartExtraTopping = ({ currentFoodWithMessage }) => {
   const dispatch = useDispatch();
   const { foods } = useGetFoods();
   const { control } = useForm();

   const toppings = foods.doc.filter(food => food.type === 'topping');

   let { currentExtrasQuantity } = useCalculateCurrentExtrasQuantity(currentFoodWithMessage, toppings);

   if (!currentExtrasQuantity) currentExtrasQuantity = toppings.map(() => 0);

   const handleIncrease = topping => dispatch(increaseCartExtras({ topping, currentFood: currentFoodWithMessage }));
   const handleDecrease = topping => dispatch(decreaseCartExtras({ topping, currentFood: currentFoodWithMessage }));

   useGetCurrentUserCart();

   if (!currentFoodWithMessage) return <Spinner />;

   return (
      <View>
         <View style={[styles.shadow, shadowProp]}>
            <UserInput control={control} name='orderMessage' initialValue={currentFoodWithMessage?.message} />
         </View>
         <ScrollView>
            {toppings.map((item, index) => (
               <View style={styles.container} key={item._id}>
                  <Text style={styles.itemText}>
                     {item.name} &nbsp;
                     <Text style={styles.priceText}>(+{formatCurrency(item.price)})</Text>
                  </Text>
                  {currentExtrasQuantity[index] === 0 ? (
                     <TouchableOpacity onPress={() => handleIncrease(item)}>
                        <Icon name='add-circle' form={false} style={styles.icon} />
                     </TouchableOpacity>
                  ) : (
                     <View style={styles.modifyQuantity}>
                        <TouchableOpacity onPress={() => handleDecrease(item)}>
                           <Icon name='remove-circle-outline' form={false} style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={[styles.itemText, styles.quantity]}>{currentExtrasQuantity[index]}</Text>
                        <TouchableOpacity onPress={() => handleIncrease(item)}>
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
   currentFoodWithMessage: PropTypes.object,
   toppings: PropTypes.array,
};
export default CartExtraTopping;
