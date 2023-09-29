import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import PropTypes from 'prop-types';
import { style, descText, star } from '../../../styles/style';
import { Platform } from 'react-native';
import Button from '../../../components/Button';
import ReviewPopup from './ReviewPopup';
import { useAuth } from '../../../contexts/AuthContext';

const FoodReviews = ({ reviews, id }) => {
   const [modalVisible, setModalVisible] = useState(false);
   const { user } = useAuth();

   const handleOnClick = () => {
      setModalVisible(visible => !visible);
   };
   const closeModal = () => {
      setModalVisible(false);
   };

   if (modalVisible) return <ReviewPopup closeModal={closeModal} modalVisible={modalVisible} id={id} />;

   if (typeof reviews === 'string') {
      return (
         <View style={styles.container}>
            <Text style={styles.noReviewText}>{reviews}</Text>
            <Button handleSubmit={handleOnClick}>Leave a review now!</Button>
         </View>
      );
   }
   return (
      <View style={styles.container}>
         <ScrollView style={styles.footer} horizontal={true} showsHorizontalScrollIndicator={false}>
            {reviews.map((el, i) => (
               <View key={i} style={[styles.reviewBox, styles.shadowProp]}>
                  <Text style={descText}>{el.review}</Text>
                  <StarRating rating={el.rating} style={star} onChange={() => {}} animationConfig={{ scale: 1 }} />
               </View>
            ))}
         </ScrollView>

         {user._id !== reviews[0].user._id ? (
            <Button handleSubmit={handleOnClick}>Leave a review</Button>
         ) : (
            <Text style={[styles.review, descText]}>You already have a review on this food.</Text>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   noReviewText: {
      textAlign: 'center',
      fontWeight: 500,
      fontSize: 18,
      marginBottom: 20,
   },
   container: {
      marginBottom: 50,
   },
   footer: {
      marginBottom: 20,
      marginLeft: 20,
   },
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
   },
   review: {
      textAlign: 'center',
   },

   reviewBox: {
      borderRadius: style['default-border-radius'],
      backgroundColor: style['color-light-grey'],
      padding: 15,
      marginRight: 20,
      marginLeft: 5,
      width: '30%',
      minWidth: '60%',
      marginVertical: 10,
      gap: 10,
   },
   shadowProp: {
      ...Platform.select({
         ios: {
            shadowColor: style['default-box-shadow-color'],
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 4,
         },
         android: {
            elevation: 8,
         },
      }),
   },
});

FoodReviews.propTypes = {
   id: PropTypes.string,
   reviews: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};
export default FoodReviews;
