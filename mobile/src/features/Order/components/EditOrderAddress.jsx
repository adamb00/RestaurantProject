import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import EditOrderAddressHeader from './EditOrderAddressHeader';
import EditOrderAddressForm from './EditOrderAddressForm';
import { useLocation } from '../../../contexts/LocationContext';
import Spinner from '../../../components/Spinner';
import { useSetAddress } from '../hooks/useSetAddress';

const EditOrderAddress = () => {
   const { reverseGeocodeResult, loading } = useLocation();

   if (loading || !reverseGeocodeResult) return <Spinner />;

   const [{ postalCode, city, street, streetNumber }] = reverseGeocodeResult;
   const { address, setAddress } = useSetAddress(postalCode, city, street, streetNumber);

   return (
      <SafeAreaView style={styles.container}>
         <EditOrderAddressHeader address={address} />
         <EditOrderAddressForm setAddress={setAddress} address={address} />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      display: 'flex',
      gap: 10,
   },
});
export default EditOrderAddress;
