import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { star, style } from '../../../styles/style';
import StarRating from 'react-native-star-rating-widget';
import BackgroundImage from '../../../components/BackgroundImage';

const TopFavoriteFoodItem = ({ food }) => {
   return (
      <View style={styles.food}>
         <BackgroundImage image={food.image}>
            <Text style={styles.foodItem}>{food.name}</Text>
            <StarRating
               rating={food.ratingsAverage}
               enableHalfStar={true}
               starSize={24}
               onChange={() => {}}
               animationConfig={{ scale: 1 }}
               style={star}
               color={style['color-primary-tint']}
               emptyColor={style['color-light-gre-2']}
            />
         </BackgroundImage>
      </View>
   );
};

TopFavoriteFoodItem.propTypes = {
   food: PropTypes.object,
};
const styles = StyleSheet.create({
   food: {
      borderWidth: style['default-boder-width'],
      borderRadius: style['default-border-radius'],
      borderColor: style['color-primary'],
   },
   foodItem: {
      fontSize: 22,
   },
   backgroundImage: {
      paddingHorizontal: 30,
      paddingVertical: 20,
      resizeMode: 'cover',
      justifyContent: 'center',
   },
});
export default TopFavoriteFoodItem;
