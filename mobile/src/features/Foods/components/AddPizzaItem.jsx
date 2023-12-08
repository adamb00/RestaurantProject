import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../components/Icon';

const AddPizzaItem = ({ size, food, handleAddToCart }) => {
   return (
      <TouchableOpacity onPress={() => handleAddToCart(food, size)}>
         <View style={styles.sizeContainer}>
            <Text>{size}</Text>
            <Icon name='add-circle-outline' form={false} />
         </View>
      </TouchableOpacity>
   );
};

AddPizzaItem.propTypes = {
   size: PropTypes.string,
   food: PropTypes.object,
   handleAddToCart: PropTypes.func,
};
const styles = StyleSheet.create({
   sizeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
   },
});
export default AddPizzaItem;
