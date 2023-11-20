import React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useGetTopFavoriteFoods } from '../../Foods/hooks/useFood';
import Spinner from '../../../components/Spinner';
import TopFavoriteFoodItem from './TopFavoriteFoodItem';

const TopFavoriteFoods = () => {
   const { favFoods, isLoading } = useGetTopFavoriteFoods();
   if (!favFoods || isLoading) return <Spinner />;
   return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.container}>
         <View style={styles.containerItem}>
            {favFoods.foods.map(food => (
               <TopFavoriteFoodItem key={food._id} food={food} />
            ))}
         </View>
      </ScrollView>
   );
};

TopFavoriteFoods.propTypes = {
   food: PropTypes.object,
};
const styles = StyleSheet.create({
   container: {},
   containerItem: {
      flexDirection: 'row',
      gap: 20,
      margin: 20,
   },
});
export default TopFavoriteFoods;
