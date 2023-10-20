import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { shadowProp } from '../../../styles/style';
import { useLocation } from '../../../contexts/LocationContext';
import { ZOOM_LEVEL, formatCurrency } from '../../../helpers/config';
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
   getExtrasTotalPrice,
   getFoodsTotalPrice,
   getTotalItemsQuantity,
   setCartId,
} from '../../Cart/reducers/cartReducer';
import { useCreateOrder } from '../hooks/useOrder';
import { useDeleteCart } from '../../Cart/hooks/useCart';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../../contexts/AuthContext';

const OrderItems = () => {
   const { latitude, longitude, reverseGeocodeResult, loading } = useLocation();
   const navigation = useNavigation();
   const dispatch = useDispatch();
   const cart = useSelector(getCart);
   const cartId = useSelector(getCartId);
   const { createOrder } = useCreateOrder();
   const { deleteCart } = useDeleteCart();

   const extrasPrice = useSelector(getExtrasTotalPrice);
   const foodsPrice = useSelector(getFoodsTotalPrice);
   const wrappingPrice = useSelector(getTotalItemsQuantity) * 250;
   const deliveryPrice = 850;

   const totalPrice = extrasPrice + foodsPrice + wrappingPrice + deliveryPrice;

   if (loading || !reverseGeocodeResult) return <Spinner />;

   const [{ postalCode, city, street, streetNumber }] = reverseGeocodeResult;

   const {
      user: { address },
   } = useAuth();

   const handleOrder = () => {
      navigation.navigate('OrderItems');
      console.log('cart', cart);
      // createOrder(
      //    { cart, address },
      //    {
      //       onSuccess: data => {
      //          if (data.status === 'error')
      //             Toast.show({
      //                type: 'error',
      //                text1: data.message.message.split(':')[2],
      //             });
      //          else {
      //             navigation.navigate('Home');
      //             Toast.show({
      //                type: 'success',
      //                text1: 'Order successfully sent',
      //             });
      //             deleteCart(cartId);
      //             dispatch(clear());
      //             dispatch(setCartId(''));
      //          }
      //       },
      //    }
      // );
   };

   return (
      <SafeAreaView>
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
            <OrderSummary deliveryPrice={deliveryPrice} />
         </View>
         <Button handleSubmit={handleOrder} onLoading={loading} disabled={totalPrice <= 2000}>
            {totalPrice > 2000 ? `Order for: ${formatCurrency(totalPrice)}` : 'Minimum order is 2000 Ft.-'}
         </Button>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   map: {
      height: 200,
      marginHorizontal: 20,
   },
   markerImage: {
      width: 35,
      height: 35,
   },
});

export default OrderItems;
