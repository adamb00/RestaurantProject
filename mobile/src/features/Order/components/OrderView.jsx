import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { header_tertiary } from '../../../styles/style';
import { useGetFoods } from '../../Foods/hooks/useFood';
import Spinner from 'react-native-loading-spinner-overlay';
import FoodItem from '../../Foods/components/FoodItem';
import { useScrollTo } from '../hooks/useScrollTo';

const OrderView = ({ types, scrollTo }) => {
   const { foods } = useGetFoods();
   const { scrollViewRef } = useScrollTo(scrollTo, types);
   const screenHeight = Dimensions.get('window').height;

   if (!foods) {
      return (
         <View>
            <Spinner />
         </View>
      );
   }

   return (
      <ScrollView style={{ height: screenHeight * 0.7 }} ref={scrollViewRef} showsVerticalScrollIndicator={false}>
         {types.map(type => (
            <View key={type} style={styles.typeContainer}>
               <Text style={header_tertiary}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
               {foods.doc
                  .filter(food => food.type === type)
                  .map(food => food.isAvailable && <FoodItem food={food} key={food._id} />)}
            </View>
         ))}
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   typeContainer: {
      marginVertical: 50,
   },
});

OrderView.propTypes = {
   types: PropTypes.array,
   scrollTo: PropTypes.string,
};

export default OrderView;
