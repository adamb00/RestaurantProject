import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import { useGetOneFood } from '../../Foods/hooks/useFood';
import UpdateItemQuantity from './UpdateItemQuantity';
import { useSelector } from 'react-redux';
import { getCartId, getTotalItemPrice } from '../reducers/cartReducer';
import { formatCurrency, truncateText } from '../../../helpers/config';
import { style } from '../../../styles/style';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../../components/Icon';
import Spinner from '../../../components/Spinner';

const CartItem = ({ food }) => {
   const screenWidht = Dimensions.get('window').width;
   const navigation = useNavigation();
   const cartId = useSelector(getCartId);
   const price = useSelector(getTotalItemPrice(food.food._id));
   const { isLoading, currentFood } = useGetOneFood(food.food._id);

   if (isLoading || !currentFood) return <Spinner />;

   const { doc: currentFoodData } = currentFood;

   return (
      <View style={styles.mainContainer}>
         <View style={styles.container}>
            <TouchableOpacity style={styles.nameContainer} onPress={() => navigation.navigate('FoodInfo', food.food)}>
               <Text style={styles.name}>{currentFoodData.name}</Text>
               <Text style={styles.description}>
                  ({truncateText(currentFoodData.description, screenWidht < 550 ? 40 : 65)})
               </Text>
            </TouchableOpacity>
            <View style={styles.quantityContainer}>
               <UpdateItemQuantity food={currentFoodData} currentQuantity={food.quantity} cartId={cartId} />
               <Text style={styles.price}>{formatCurrency(price)}</Text>
            </View>
         </View>
         <View>
            <TouchableOpacity onPress={() => navigation.navigate('CartExtra', { foodData: food })}>
               <View style={styles.extraWrapper}>
                  <Icon name='add-circle-outline' form={false} style={styles.icon} />
                  <Text style={styles.extra}> Add some extra</Text>
               </View>
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   mainContainer: {
      borderBottomColor: style['color-primary-tint'],
      borderBottomWidth: 1,
      paddingBottom: 5,
      marginVertical: 20,
   },
   container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   nameContainer: {
      flex: 1,
      gap: 5,
   },
   quantityContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 10,
   },
   icon: {
      color: style['color-primary'],
      fontSize: 20,
   },
   name: {
      fontSize: 18,
      fontWeight: 500,
   },
   description: {
      fontStyle: 'italic',
      color: style['color-dark-grey'],
   },
   price: {
      borderColor: style['color-dark-grey-2'],
      borderWidth: 1,
      padding: 10,
      fontSize: 16,
      borderRadius: style['default-border-radius'],
   },
   extra: {
      marginVertical: 5,
      fontStyle: 'italic',
      color: style['color-primary'],
   },
   extraWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
   },
});

CartItem.propTypes = {
   food: PropTypes.object,
};

export default CartItem;
