import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';
import { style } from '../../../styles/style';
import { formatCurrency, truncateText } from '../../../helpers/config';
import Icon from '../../../components/Icon';

import { useNavigation } from '@react-navigation/native';
// import StarRating from 'react-native-star-rating-widget';

const FoodItem = ({ food }) => {
   // const [rating, setRating] = useState(food.ratingsAverage);
   const screenWidht = Dimensions.get('window').width;
   const navigation = useNavigation();

   if (!food) {
      return <Text>No food data available</Text>;
   }

   return (
      <TouchableOpacity
         onPress={() => {
            console.log('food');
         }}
      >
         <View style={styles.container}>
            <View>
               <View>
                  <Text style={[styles.foodText, styles.name]}>{food.name}</Text>
                  <Text style={[styles.foodText]}></Text>
               </View>
               <View style={styles.descriptionContainer}>
                  <Text style={[styles.foodText, styles.description]}>
                     {truncateText(food.description, screenWidht < 550 ? 25 : 50)}
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('FoodInfo', food)}>
                     <Icon name='information-circle-outline' form={false} />
                  </TouchableOpacity>
               </View>

               <Text style={[styles.foodText, styles.price]}>{formatCurrency(food.price)}-tol</Text>
            </View>
            <TouchableOpacity onPress={() => console.log('+')}>
               <Icon name='add-circle-outline' form={false} />
            </TouchableOpacity>
         </View>
      </TouchableOpacity>
   );
};

FoodItem.propTypes = {
   food: PropTypes.object,
};

export default FoodItem;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 20,
      paddingVertical: 10,
      borderBottomColor: style['color-light-grey-2'],
      borderBottomWidth: 2,
      marginHorizontal: 10,
      justifyContent: 'space-between',
      width: '95%',
      alignSelf: 'center',
   },
   foodText: {
      fontSize: 16,
   },
   name: {
      fontSize: 22,
      marginBottom: 2,
      letterSpacing: 2,
   },

   descriptionContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 4,
   },
   description: {
      color: style['color-dark-grey'],
      marginBottom: 5,
      letterSpacing: 1.6,
   },

   price: {
      color: style['color-dark-grey-2'],
      letterSpacing: 1.2,
   },
});

{
   /* <StarRating
                     enableHalfStar={true}
                     rating={rating}
                     style={styles.stars}
                     color={style['color-primary-tint']}
                     emptyColor={style['color-primary-shade']}
                     starSize={20}
      /> */
}
