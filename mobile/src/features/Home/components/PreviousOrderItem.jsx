import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shadowProp, style } from '../../../styles/style';
import { formatCurrency, formatDate, getOrdinalSuffix } from '../../../helpers/config';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../../components/Icon';

const setIcon = status => {
   let iconName;
   let color;
   let message;

   switch (status) {
      case 'active':
         iconName = 'checkmark-circle-outline';
         color = style['color-primary'];
         message = 'Order is not accepted yet!';
         break;
      case 'done':
         iconName = 'checkmark-done-circle-outline';
         message = 'Order accepted and under creation!';
         color = style['color-success'];
         break;
      case 'declined':
         iconName = 'close-circle-outline';
         color = style['color-error'];
         message = 'Order declined!';
         break;
   }

   return { iconName, color, message };
};

const PreviousOrderItem = ({ order }) => {
   const [showInfo, setShowInfo] = useState(false);
   const [infoMessage, setInfoMessage] = useState('');
   const screenWidht = Dimensions.get('window').width;
   const { address } = order;
   const navigation = useNavigation();
   const { iconName, color, message } = setIcon(order.status);

   const handleOnClick = () => {
      navigation.navigate('PreviousOrderItemCurrent', order);
   };

   const handleOnIconClick = () => {
      setInfoMessage(message);
      setShowInfo(true);
      setTimeout(() => {
         setShowInfo(false);
         setInfoMessage('');
      }, 3000);
   };

   if (screenWidht < 800) {
      return (
         <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleOnClick}>
               <View style={[shadowProp, styles.orderItemContainer]}>
                  <View style={styles.orderItemHeadMobile}>
                     <View style={styles.activeContainer}>
                        <Icon name={iconName} form={false} style={{ fontSize: 34, color }} />
                        <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
                     </View>
                     <Text style={styles.totalPrice}>Total: {formatCurrency(order.totalPrice)}</Text>
                  </View>
                  <View style={styles.orderAddress}>
                     <View style={styles.orderItemAddressMobile}>
                        <Text style={styles.addressText}>
                           {address.postalCode} {address.city}
                        </Text>
                        <Text style={styles.addressText}>
                           {address.street}. {address.streetNumber}
                        </Text>
                     </View>
                     {(address.floor || address.ring || address.door) && (
                        <View style={styles.orderItemAddressFloor}>
                           <Text style={styles.floorText}>{getOrdinalSuffix(address.floor)} floor,</Text>
                           <Text style={styles.floorText}>{getOrdinalSuffix(address.door)} door,</Text>
                           <Text style={styles.floorText}>{getOrdinalSuffix(address.ring)} ring </Text>
                        </View>
                     )}
                  </View>
               </View>
            </TouchableOpacity>
         </SafeAreaView>
      );
   }

   return (
      <SafeAreaView style={styles.container}>
         <TouchableOpacity onPress={handleOnClick}>
            <View style={shadowProp}>
               <View style={styles.orderItemContainer}>
                  <View style={styles.orderItemHead}>
                     <View style={styles.activeContainer}>
                        <TouchableOpacity onPress={handleOnIconClick}>
                           <Icon name={iconName} form={false} style={{ fontSize: 34, color }} />
                        </TouchableOpacity>
                        <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
                        {showInfo && (
                           <View style={styles.infoMessage}>
                              <Text style={styles.infoText}>{infoMessage}</Text>
                           </View>
                        )}
                     </View>
                     <Text style={styles.totalPrice}>Total: {formatCurrency(order.totalPrice)}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                     <View style={styles.orderAddress}>
                        <View style={styles.orderItemAddress}>
                           <Text style={styles.addressText}>
                              {address.postalCode} {address.city}
                           </Text>
                           <Text style={styles.addressText}>
                              {address.street}. {address.streetNumber}
                           </Text>
                        </View>
                        {(address.floor || address.ring || address.door) && (
                           <View style={styles.orderItemAddressFloor}>
                              <Text style={styles.floorText}>{getOrdinalSuffix(address.floor)} floor,</Text>
                              <Text style={styles.floorText}>{getOrdinalSuffix(address.door)} door,</Text>
                              <Text style={styles.floorText}>{getOrdinalSuffix(address.ring)} ring </Text>
                           </View>
                        )}
                     </View>
                     <Button uniqueStyle={styles.button} handleSubmit={handleOnClick}>
                        Show
                     </Button>
                  </View>
               </View>
            </View>
         </TouchableOpacity>
      </SafeAreaView>
   );
};

PreviousOrderItem.propTypes = {
   order: PropTypes.object,
};
const styles = StyleSheet.create({
   buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'space-between',
   },
   button: {
      width: '100%',
   },

   activeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      position: 'relative',
   },

   orderItemContainer: {
      borderRadius: style['default-border-radius'],
      backgroundColor: style['color-light-grey'],
      paddingVertical: 20,
      paddingHorizontal: 40,
      gap: 10,
      left: 2,
      width: '99%',
      marginBottom: 40,
   },

   orderItemHead: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
   },

   orderItemHeadMobile: {
      gap: 5,
   },

   orderAddress: {
      gap: 2,
   },

   orderItemAddress: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
   },

   orderItemAddressMobile: {
      gap: 1,
   },
   orderItemAddressFloor: {
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
   },

   infoMessage: {
      position: 'absolute',
      bottom: 13,
      left: 25,
      backgroundColor: style['color-light-grey-2'],
      padding: 10,
      borderRadius: style['default-border-radius'],
      borderWidth: style['default-boder-width'],
      borderColor: 'transparent',
      width: 'auto',
   },
   infoText: {
      fontSize: 16,
      color: style['color-dark-grey-2'],
   },

   totalPrice: { fontSize: 20, color: style['color-primary-shade'] },
   orderDate: { fontSize: 18, color: style['color-primary'] },
   addressText: { fontSize: 18, color: style['color-secondary'] },
   floorText: { fontSize: 16, color: style['color-secondary-tint'] },
});

export default PreviousOrderItem;
