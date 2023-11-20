import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { header_tertiary_center, style } from '../../../styles/style';
import PropTypes from 'prop-types';

import ButtonEdit from '../../../components/ButtonEdit';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/AuthContext';
import { getOrdinalSuffix } from '../../../helpers/config';

const OrderAddress = ({ reverseGeocodeResult }) => {
   const navigation = useNavigation();

   const [{ postalCode, city, street, streetNumber }] = reverseGeocodeResult;

   let {
      user: { address },
   } = useAuth();

   if (!address) address = reverseGeocodeResult;

   return (
      <SafeAreaView>
         <View style={styles.textContainer}>
            <Text style={header_tertiary_center}>All datas are correct?</Text>
            <View style={styles.addressContainer}>
               <View style={styles.addressContainerWrapper}>
                  <View>
                     <Text style={styles.street}>
                        {address.street ? address.street : street}&nbsp;
                        {address.streetNumber ? address.streetNumber : streetNumber}
                     </Text>
                     <Text>
                        {address.postalCode ? address.postalCode : postalCode} {address.city ? address.city : city}
                     </Text>
                  </View>
               </View>
            </View>
            <View style={styles.floorDoor}>
               <Text>Floor: {address.floor ? `${getOrdinalSuffix(address.floor)} floor` : 'Floor not given'}</Text>
            </View>
            <View>
               <Text>Door: {address.door ? `${getOrdinalSuffix(address.door)} door` : 'Door not given'}</Text>
            </View>
            <View>
               <Text>
                  Door ring: {address.ring ? `${getOrdinalSuffix(address.ring)} door ring` : 'Door ring not given'}
               </Text>
            </View>
            <View style={styles.button}>
               <ButtonEdit handleSubmit={() => navigation.navigate('EditOrderAddress')}>Modify</ButtonEdit>
            </View>
         </View>
      </SafeAreaView>
   );
};

OrderAddress.propTypes = {
   reverseGeocodeResult: PropTypes.array,
   route: PropTypes.object,
};

const styles = StyleSheet.create({
   textContainer: {
      padding: 20,
      marginHorizontal: 20,
      backgroundColor: style['color-light-grey'],
      position: 'relative',
   },
   title: {
      color: style['color-secondary'],
      fontSize: 16,
      fontWeight: '500',
   },
   button: {
      position: 'absolute',
      right: 10,
      bottom: 10,
   },
   addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
   },
   addressContainerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
   },
   street: {
      fontWeight: 'bold',
      fontSize: 16,
   },
   floorDoor: {
      flexDirection: 'row',
      gap: 20,
   },
});
export default OrderAddress;
