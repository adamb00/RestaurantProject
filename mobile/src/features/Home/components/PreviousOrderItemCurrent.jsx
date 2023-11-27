import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DELIVERY_PRICE, WRAPPING_PRICE, formatCurrency } from '../../../helpers/config';
import { shadowProp, style } from '../../../styles/style';
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, setCart } from '../../Cart/reducers/cartReducer';
import Toast from 'react-native-toast-message';

const PreviousOrderItemCurrent = () => {
   const route = useRoute();
   const { items, totalPrice, numOfItems } = route.params;
   const navigation = useNavigation();

   const screenWidht = Dimensions.get('window').width;

   const dispatch = useDispatch();
   const cart = useSelector(getCart);

   const handleAddToCart = () => {
      if (cart.length === 0) {
         dispatch(setCart(items));
      } else {
         const mergedCart = [...cart, ...items];
         dispatch(setCart(mergedCart));
      }

      Toast.show({
         type: 'success',
         text1: 'Cart successfully updated',
      });

      navigation.navigate('HomeScreen');
   };

   return (
      <SafeAreaView style={styles.container}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
            <Icon name='arrow-back-circle-outline' form={false} style={styles.icon} />
         </TouchableOpacity>
         <View
            style={[
               shadowProp,
               styles.itemContainer,
               { marginHorizontal: screenWidht < 800 ? 10 : 40, gap: screenWidht < 800 ? 20 : 30 },
            ]}
         >
            {items.map(item => (
               <View
                  key={item.food._id}
                  style={[styles.cartContainer, { marginHorizontal: screenWidht < 800 ? 10 : 40 }]}
               >
                  <View style={styles.foodContainer}>
                     <View style={styles.food}>
                        <Text
                           style={[
                              styles.foodName,
                              { fontSize: screenWidht < 800 ? 20 : 24, letterSpacing: screenWidht < 800 ? 2 : 4 },
                           ]}
                        >
                           {item.quantity}x
                        </Text>
                        <Text
                           style={[
                              styles.foodName,
                              { fontSize: screenWidht < 800 ? 20 : 24, letterSpacing: screenWidht < 800 ? 2 : 4 },
                           ]}
                        >
                           {item.food.name}
                        </Text>
                     </View>
                     <Text
                        style={[
                           styles.price,
                           { fontSize: screenWidht < 800 ? 20 : 24, letterSpacing: screenWidht < 800 ? 2 : 4 },
                        ]}
                     >
                        {formatCurrency(item.quantity * item.food.price)}
                     </Text>
                  </View>
                  {item.extras &&
                     item.extras.map(extra => (
                        <View key={extra.topping._id} style={styles.extraContainer}>
                           <View style={styles.extra}>
                              <Text
                                 style={[
                                    {
                                       fontSize: screenWidht < 800 ? 16 : 20,
                                       letterSpacing: screenWidht < 800 ? 1.5 : 3,
                                    },
                                    styles.extraName,
                                 ]}
                              >
                                 {extra.quantity}x
                              </Text>
                              <Text
                                 style={[
                                    {
                                       fontSize: screenWidht < 800 ? 16 : 20,
                                       letterSpacing: screenWidht < 800 ? 1.5 : 3,
                                    },
                                    styles.extraName,
                                 ]}
                              >
                                 {extra.topping.name}
                              </Text>
                           </View>
                           <Text
                              style={[
                                 { fontSize: screenWidht < 800 ? 16 : 20, letterSpacing: screenWidht < 800 ? 1.5 : 3 },
                                 styles.extraPrice,
                              ]}
                           >
                              {formatCurrency(extra.quantity * extra.topping.price)}
                           </Text>
                        </View>
                     ))}
               </View>
            ))}

            <View style={[styles.wrappingContainer, { marginHorizontal: screenWidht < 800 ? 20 : 40 }]}>
               <Text style={[styles.wrapping, { fontSize: screenWidht < 800 ? 16 : 20 }]}>{numOfItems}x Wrapping</Text>
               <Text style={[styles.wrappingPrice, { fontSize: screenWidht < 800 ? 16 : 20 }]}>
                  {formatCurrency(numOfItems * WRAPPING_PRICE)}
               </Text>
            </View>

            <View style={[styles.wrappingContainer, { marginHorizontal: screenWidht < 800 ? 20 : 40 }]}>
               <Text style={[styles.wrapping, { fontSize: screenWidht < 800 ? 16 : 20 }]}>1x Delivery</Text>
               <Text style={[styles.wrappingPrice, { fontSize: screenWidht < 800 ? 16 : 20 }]}>
                  {formatCurrency(DELIVERY_PRICE)}
               </Text>
            </View>

            <Text style={[styles.totalPrice, { fontSize: screenWidht < 800 ? 24 : 28 }]}>
               Total: {formatCurrency(totalPrice)}
            </Text>
            <Button
               handleSubmit={handleAddToCart}
               uniqueStyle={[styles.button, { width: screenWidht < 800 ? '80%' : '40%' }]}
            >
               Add to cart
            </Button>
         </View>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   back: {
      marginHorizontal: 20,
   },

   icon: {
      fontSize: 34,
   },

   button: {
      alignSelf: 'center',
   },

   itemContainer: {
      backgroundColor: style['color-light-grey'],
      borderRadius: style['default-border-radius'],
      paddingVertical: 50,
      paddingHorizontal: 10,
   },

   container: {
      marginVertical: 50,
      gap: 20,
   },
   cartContainer: {
      paddingBottom: 10,
      borderBottomColor: style['color-light-grey-2'],
      borderBottomWidth: style['default-boder-width'],
   },
   foodContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   food: {
      flexDirection: 'row',
      marginBottom: 10,
      gap: 3,
   },
   extraContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 15,
      display: 'flex',
      marginBottom: 10,
   },
   extra: {
      flexDirection: 'row',
      gap: 3,
   },
   foodName: {
      color: style['color-primary'],
   },
   extraName: {
      color: style['color-primary-shade'],
   },
   price: {
      color: style['color-primary-shade'],
   },
   extraPrice: {
      color: style['color-secondary-tint'],
   },
   totalPrice: {
      marginHorizontal: 40,
      alignSelf: 'flex-end',
      color: style['color-primary'],
      fontSize: 28,
      textDecorationLine: 'underline',
      textDecorationColor: style['color-primary-tint'],
   },

   wrappingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 10,
      borderBottomColor: style['color-light-grey-2'],
      borderBottomWidth: style['default-boder-width'],
   },

   wrapping: {
      fontSize: 20,
      color: style['color-primary-shade'],
      letterSpacing: 3,
   },

   wrappingPrice: {
      fontSize: 20,
      color: style['color-primary-shade'],
   },
});
export default PreviousOrderItemCurrent;
