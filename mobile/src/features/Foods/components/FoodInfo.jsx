import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from '../../../components/Icon';
import { header_info, style, descText, star } from '../../../styles/style';
import { formatCurrency, glutenFree, lactoseFree } from '../../../helpers/config';
import { useGetReviewsOnFood } from '../hooks/useReviewsOnFood';
import FoodReviews from './FoodReviews';
import { useGetOneFood } from '../hooks/useFood';
import Spinner from '../../../components/Spinner';

const FoodInfo = () => {
   const route = useRoute();
   const navigation = useNavigation();
   const food = route.params;
   const { reviews } = useGetReviewsOnFood(food._id);
   const { isLoading, currentFood } = useGetOneFood(food._id);

   if (isLoading || !currentFood) return <Spinner />;

   const { doc: currentFoodData } = currentFood;

   if (!reviews) return;

   return (
      <SafeAreaView>
         <ScrollView>
            <View style={styles.header}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name='close-circle-outline' form={false} />
               </TouchableOpacity>
               <Text style={styles.headerText}>Detailed product description</Text>
            </View>
            <View style={styles.body}>
               <View style={styles.container}>
                  <View style={styles.container_title}>
                     <Text style={styles.foodName}>{food.name}</Text>
                     <Text style={styles.foodPrice}>{formatCurrency(food.price)}</Text>
                  </View>
                  <StarRating
                     rating={currentFoodData.ratingsAverage}
                     enableHalfStar={true}
                     starSize={24}
                     onChange={() => {}}
                     animationConfig={{ scale: 1 }}
                     style={star}
                     color={style['color-primary-tint']}
                     emptyColor={style['color-light-gre-2']}
                  />
                  <Text style={styles.description}>{food.description}</Text>
               </View>
               {food.type === 'pizza' && (
                  <View style={styles.container}>
                     <Text style={styles.headerElem}>Available sizes:</Text>
                     <Text style={styles.description}>28 cm, 32 cm, 52 cm</Text>
                  </View>
               )}
               <View style={styles.container}>
                  <Text style={styles.headerElem}>More details</Text>
                  <Text style={header_info}>Gluten free?</Text>
                  <Text style={[styles.description, descText]}>{glutenFree(food)}</Text>
                  <Text style={header_info}>Lactose free?</Text>
                  <Text style={[styles.description, descText]}>{lactoseFree(food)}</Text>
               </View>
               <View style={styles.container}>
                  <Text style={styles.headerElem}>Price information</Text>
                  <Text style={[styles.description, descText]}>
                     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                     industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                     and scrambled it to make a type specimen book.
                  </Text>
               </View>
            </View>

            <FoodReviews reviews={reviews} id={food._id} />
         </ScrollView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 30,
      borderBottomWidth: 1,
      paddingBottom: 10,
      paddingLeft: 10,
      borderBottomColor: style['color-light-grey-2'],
   },
   headerText: {
      fontSize: 18,
      fontWeight: '500',
   },
   body: {
      marginVertical: 40,
      marginHorizontal: 10,
   },
   headerElem: {
      fontSize: 20,
      fontWeight: '500',
      marginBottom: 10,
   },

   container: {
      borderBottomWidth: 1,
      borderBottomColor: style['color-light-grey-2'],
      marginBottom: 40,
      paddingBottom: 20,
   },

   container_title: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'space-between',
   },
   foodName: {
      fontWeight: '700',
      fontSize: 22,
   },
   foodPrice: {
      fontSize: 18,
      fontWeight: '500',
   },
   description: {
      marginTop: 10,
   },
});

export default FoodInfo;
