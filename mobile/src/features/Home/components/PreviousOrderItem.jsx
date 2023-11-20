import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shadowProp, style } from '../../../styles/style';
import { formatCurrency, formatDate, getOrdinalSuffix } from '../../../helpers/config';
import Button from '../../../components/Button';

const PreviousOrderItem = ({ order }) => {
   const screenWidht = Dimensions.get('window').width;
   const { address } = order;

   if (screenWidht < 600) {
      return (
         <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => console.log(order)}>
               <View style={[shadowProp, styles.orderItemContainer]}>
                  <View style={styles.orderItemHeadMobile}>
                     <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
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
         <TouchableOpacity onPress={() => console.log(order)}>
            <View style={[shadowProp, styles.orderItemContainer]}>
               <View style={styles.orderItemHead}>
                  <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
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
                  <Button uniqueStyle={styles.button} handleSubmit={() => console.log(order)}>
                     Show
                  </Button>
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

   totalPrice: { fontSize: 20, color: style['color-primary-shade'] },
   orderDate: { fontSize: 18, color: style['color-primary'] },
   addressText: { fontSize: 18, color: style['color-secondary'] },
   floorText: { fontSize: 16, color: style['color-secondary-tint'] },
});

export default PreviousOrderItem;
