import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView, StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import { shadowProp, style } from '../../../styles/style';
import { useLocation } from '../../../contexts/LocationContext';
import { DELIVERY_PRICE, WRAPPING_PRICE, ZOOM_LEVEL, formatCurrency } from '../../../helpers/config';
import OrderAddress from './OrderAddress';
import LogoImage from '../../../../assets/bandula_logo_png.png';
import Spinner from '../../../components/Spinner';
import OrderSummary from './OrderSummary';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
   clear,
   getCart,
   getCartId,
   getCartMessage,
   getCoupon,
   getExtrasTotalPrice,
   getFoodsTotalPrice,
   getTotalItemsQuantity,
   setCartId,
   updateCartMessage,
   updateCoupon,
} from '../../Cart/reducers/cartReducer';
import { useCreateOrder } from '../hooks/useOrder';
import { useDeleteCart } from '../../Cart/hooks/useCart';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../../contexts/AuthContext';
import UserInput from '../../../components/UserInput';
import { useForm } from 'react-hook-form';
import { useUpdateUser } from '../../Auth/hooks/useUserAuth';

const OrderItems = () => {
   const { latitude, longitude, reverseGeocodeResult, loading } = useLocation();

   const navigation = useNavigation();
   const dispatch = useDispatch();
   const cart = useSelector(getCart);
   const cartId = useSelector(getCartId);
   const cartMessage = useSelector(getCartMessage);
   const coupon = useSelector(getCoupon);
   const { control } = useForm();

   const { createOrder } = useCreateOrder();
   const { deleteCart } = useDeleteCart();
   const { updateUser } = useUpdateUser();

   const extrasPrice = useSelector(getExtrasTotalPrice);
   const foodsPrice = useSelector(getFoodsTotalPrice);
   const wrappingPrice = useSelector(getTotalItemsQuantity) * WRAPPING_PRICE;

   let totalPrice = extrasPrice + foodsPrice + wrappingPrice + DELIVERY_PRICE;
   const disc = (totalPrice / 100) * coupon.discount;

   if (disc) totalPrice = totalPrice - disc;

   const {
      user: { address },
      user,
   } = useAuth();

   if (loading || !reverseGeocodeResult) return <Spinner />;

   const [{ postalCode, city, street, streetNumber }] = reverseGeocodeResult;

   const handleOnChangeText = item => {
      dispatch(updateCartMessage(item));
   };

   const handleOrder = () => {
      const updatedCoupons = user.coupons.map(coup => {
         if (coup.name === coupon.name) {
            return { ...coup, status: 'active' };
         }
         return coup;
      });
      const updatedUser = { ...user, coupons: updatedCoupons };
      updateUser({ ...updatedUser });
      createOrder(
         { cart, address, message: cartMessage, totalPrice, coupon, createdAt: Date.now() },
         {
            onSuccess: data => {
               if (data.status === 'error')
                  Toast.show({
                     type: 'error',
                     text1: data.message.message.split(':')[2],
                  });
               else {
                  navigation.navigate('HomeScreen');
                  Toast.show({
                     type: 'success',
                     text1: 'Order successfully sent',
                  });
                  deleteCart(cartId);
                  dispatch(clear());
                  dispatch(setCartId(''));
                  dispatch(updateCoupon({}));
               }
            },
         }
      );
   };

   if (cart.length === 0) {
      return (
         <SafeAreaView style={styles.emptyCart}>
            <View style={styles.emptyCartContainer}>
               <Text style={styles.emptyCartMessage}>There is no item in your cart!</Text>
               <Text style={styles.emptyCartMessage}>Please add some item before finish the order</Text>
            </View>
            <Button handleSubmit={() => navigation.navigate('Order')}>Head back to foods</Button>
         </SafeAreaView>
      );
   }

   return (
      <SafeAreaView>
         <ScrollView style={styles.container}>
            <View style={shadowProp}>
               <MapView
                  style={styles.map}
                  region={{
                     latitude,
                     longitude,
                     latitudeDelta: ZOOM_LEVEL,
                     longitudeDelta: ZOOM_LEVEL,
                  }}
               >
                  <Marker
                     coordinate={{ latitude, longitude }}
                     title='Your Position'
                     description={`${postalCode} ${city}, ${street} ${streetNumber}`}
                  >
                     <Image source={LogoImage} style={styles.markerImage} />
                  </Marker>
               </MapView>
               <OrderAddress reverseGeocodeResult={reverseGeocodeResult} />
            </View>
            <View style={shadowProp}>
               <OrderSummary discount={coupon.discount} totalPrice={totalPrice} />
            </View>
            <View style={[shadowProp, styles.shadow]}>
               <UserInput
                  placeholder='Type here any message'
                  control={control}
                  name='userMessage'
                  initialValue={cart?.message}
                  onChangeText={handleOnChangeText}
               />
            </View>
            <Button handleSubmit={handleOrder} onLoading={loading} disabled={totalPrice <= 2000}>
               {totalPrice > 2000 ? `Order for: ${formatCurrency(totalPrice)}` : 'Minimum order is 2000 Ft.-'}
            </Button>
         </ScrollView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: { marginBottom: 50 },
   map: {
      height: 200,
      marginHorizontal: 20,
   },
   markerImage: {
      width: 35,
      height: 35,
   },
   shadow: {
      marginVertical: 10,
      backgroundColor: style['color-light-grey'],
      marginHorizontal: 10,
      borderRadius: style['default-border-radius'],
   },

   emptyCart: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   emptyCartContainer: {
      gap: 5,
   },
   emptyCartMessage: {
      fontSize: 18,
      textAlign: 'center',
   },
});

export default OrderItems;
