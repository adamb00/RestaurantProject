import React from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useGetTopFavoriteFoods } from '../../Foods/hooks/useFood';
import Spinner from '../../../components/Spinner';
import TopFavoriteFoodItem from './TopFavoriteFoodItem';
import { header_primary } from '../../../styles/style';

const TopFavoriteFoods = () => {
   const { favFoods, isLoading } = useGetTopFavoriteFoods();
   if (!favFoods || isLoading) return <Spinner />;
   return (
      <View>
         <Text style={header_primary}>Our most rated foods!</Text>
         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.container}>
            <View style={styles.containerItem}>
               {favFoods.foods.map(food => (
                  <TopFavoriteFoodItem key={food._id} food={food} />
               ))}
            </View>
         </ScrollView>
      </View>
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
