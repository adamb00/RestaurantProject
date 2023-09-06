import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { header_primary } from '../../../styles/style';
import OrderNavigation from '../components/OrderNavigation';
import OrderView from '../components/OrderView';
import { useGetFoodTypes } from '../../Foods/hooks/useFood';
import Spinner from 'react-native-loading-spinner-overlay';

export const Order = () => {
   const { types } = useGetFoodTypes();
   const [scrollTo, setScrollTo] = useState('');

   if (!types)
      return (
         <View>
            <Spinner />
         </View>
      );

   return (
      <SafeAreaView>
         <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
            <Text style={header_primary}>Order your food now!</Text>
            <OrderNavigation types={types.types} setScrollTo={setScrollTo} />
            <OrderView types={types.types} scrollTo={scrollTo} />
         </KeyboardAwareScrollView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      marginTop: 50,
   },
});
