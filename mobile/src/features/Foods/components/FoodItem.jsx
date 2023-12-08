import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';
import { style } from '../../../styles/style';
import { formatCurrency, truncateText } from '../../../helpers/config';
import Icon from '../../../components/Icon';

import { useNavigation } from '@react-navigation/native';
import { getCart, getCurrentQuantity } from '../../Cart/reducers/cartReducer';
import UpdateItemQuantity from '../../Cart/components/UpdateItemQuantity';
import { useSelector } from 'react-redux';
import AddPizzaItem from './AddPizzaItem';

const FoodItem = ({ food, handleAddToCart }) => {
   const screenWidht = Dimensions.get('window').width;
   const navigation = useNavigation();

   if (!food) {
      return <Text>No food data available</Text>;
   }
   const currentQuantity = useSelector(getCurrentQuantity(food._id));

   const isInCart = currentQuantity > 0;

   const cart = useSelector(getCart);

   const isPizza = food.type === 'pizza';

   return (
      <View style={styles.container}>
         <View>
            <View>
               <Text style={[styles.foodText, styles.name]}>{food.name}</Text>
               <Text style={[styles.foodText]}></Text>
            </View>
            <View style={styles.descriptionContainer}>
               <Text style={[styles.foodText, styles.description]}>
                  {truncateText(food.description, screenWidht < 550 ? 25 : 50)}
               </Text>
               <TouchableOpacity onPress={() => navigation.navigate('FoodInfo', food)}>
                  <Icon name='information-circle-outline' form={false} />
               </TouchableOpacity>
            </View>

            <Text style={[styles.foodText, styles.price]}>
               From {formatCurrency(food.type === 'pizza' ? +food.price[0].price : +food.price)}
            </Text>
         </View>

         <View style={styles.sizeContainer}>
            {isPizza &&
               food.price.map((size, index) => {
                  const cartItem = cart.find(
                     cartItem => cartItem.food._id === food._id && cartItem.food.size === size.size
                  );

                  return (
                     <View key={`${food._id}_${size.size}_${index}`} style={styles.sizeItem}>
                        {cartItem ? (
                           <UpdateItemQuantity
                              id={food._id}
                              currentQuantity={cartItem.quantity}
                              food={{
                                 ...food,
                                 price: cartItem.food.price,
                                 size: cartItem.food.size,
                              }}
                           />
                        ) : (
                           <>
                              <AddPizzaItem
                                 size={size.size}
                                 key={food._id + index}
                                 food={food}
                                 handleAddToCart={() => handleAddToCart(food, size)}
                                 isInCart={isInCart}
                                 currentQuantity={currentQuantity}
                              />
                           </>
                        )}
                     </View>
                  );
               })}
         </View>

         {!isPizza && isInCart && <UpdateItemQuantity id={food._id} currentQuantity={currentQuantity} food={food} />}
         {!isPizza && !isInCart && (
            <View>
               <TouchableOpacity onPress={() => handleAddToCart(food)}>
                  <View>
                     <Icon name='add-circle-outline' form={false} />
                  </View>
               </TouchableOpacity>
            </View>
         )}
      </View>
   );
};

FoodItem.propTypes = {
   food: PropTypes.object,
   handleAddToCart: PropTypes.func,
   cartId: PropTypes.string,
};

export default FoodItem;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 20,
      paddingVertical: 10,
      borderBottomColor: style['color-light-grey-2'],
      borderBottomWidth: 2,
      marginHorizontal: 10,
      justifyContent: 'space-between',
      width: '95%',
      alignItems: 'top',
      alignSelf: 'center',
   },
   sizeContainer: {
      flex: 1,
      alignItems: 'flex-end',
   },
   foodText: {
      fontSize: 16,
   },
   name: {
      fontSize: 22,
      marginBottom: 2,
      letterSpacing: 2,
   },

   descriptionContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 4,
   },
   description: {
      color: style['color-dark-grey'],
      marginBottom: 5,
      letterSpacing: 1.6,
   },

   price: {
      color: style['color-dark-grey-2'],
      letterSpacing: 1.2,
   },
});
