import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shadowProp, style } from '../../../styles/style';
import StarRating from 'react-native-star-rating-widget';
import { useNavigation } from '@react-navigation/native';
import { useGetFoodImage } from '../../Foods/hooks/useGetFoodImage';

const TopFavoriteFoodItem = ({ food }) => {
   const navigation = useNavigation();
   const screenWidth = Dimensions.get('window').width;

   const image = useGetFoodImage(food.image);

   const width = screenWidth < 500 ? 300 : 500;

   const handleOnPress = () => {
      navigation.navigate('FoodInfo', food);
   };

   return (
      <View style={[styles.food, { width, height: width }, shadowProp]}>
         <TouchableOpacity onPress={handleOnPress}>
            {image && (
               <ImageBackground source={image} style={styles.backgroundImage} resizeMode='cover'>
                  <View style={styles.overlay}>
                     <View style={styles.box}>
                        <Text style={[styles.foodItem, { fontSize: screenWidth < 500 ? 22 : 28 }]}>{food.name}</Text>
                        <StarRating
                           rating={food.ratingsAverage}
                           enableHalfStar={true}
                           starSize={screenWidth < 500 ? 22 : 28}
                           onChange={() => {}}
                           style={styles.starRating}
                           color={style['color-primary-tint']}
                           animationConfig={{ scale: 1 }}
                           emptyColor={style['color-light-gre-2']}
                        />
                     </View>
                  </View>
               </ImageBackground>
            )}
         </TouchableOpacity>
      </View>
   );
};

TopFavoriteFoodItem.propTypes = {
   food: PropTypes.object,
};
const styles = StyleSheet.create({
   food: {
      borderRadius: style['default-border-radius'],
      justifyContent: 'center',
      resizeMode: 'cover',
   },

   backgroundImage: {
      width: '100%',
      height: '100%',
      borderRadius: style['default-border-radius'],
      overflow: 'hidden',
   },
   overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      justifyContent: 'center',
      padding: 20,
      alignItems: 'center',
   },
   foodItem: {
      color: style['color-dark-grey-2'],
      marginBottom: 10,
   },

   box: {
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 20,
      borderRadius: style['default-border-radius'],
      width: '90%',
   },
   starRating: {
      marginBottom: 10,
   },
});
export default TopFavoriteFoodItem;
