import React from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating-widget';
import UserInput from '../../../components/UserInput';
import { useForm, Controller } from 'react-hook-form';
import Button from '../../../components/Button';
import { star, style } from '../../../styles/style';
import { useCreateReviewOnFood } from '../hooks/useReviewsOnFood';

const ReviewPopup = ({ id, modalVisible, closeModal }) => {
   const { control, handleSubmit, reset } = useForm();
   const { createReview, isCreating } = useCreateReviewOnFood();

   const onButtonPressed = async data => {
      try {
         createReview(
            { id, data },
            {
               onSuccess: () => {
                  closeModal();
                  reset();
               },
            }
         );
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <Modal animationType='fade' transparent={true} visible={modalVisible} onRequestClose={closeModal}>
         <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
               <Text onPress={closeModal} style={styles.close}>
                  &times;
               </Text>
               <Controller
                  control={control}
                  name='rating'
                  defaultValue={1}
                  rules={{ min: 1, required: 'Please leave a rating' }}
                  render={({ field: { value, onChange } }) => (
                     <StarRating
                        style={[star, styles.star]}
                        onChange={onChange}
                        animationConfig={{ scale: 1 }}
                        enableHalfStar={false}
                        rating={value}
                     />
                  )}
               />
               <UserInput control={control} name='review' rules={{ required: 'Please leave a review' }} />
               <Button handleSubmit={handleSubmit(onButtonPressed)} disabled={isCreating}>
                  Submit
               </Button>
            </View>
         </View>
      </Modal>
   );
};

ReviewPopup.propTypes = {
   id: PropTypes.string,
   modalVisible: PropTypes.bool,
   closeModal: PropTypes.func,
};

const styles = StyleSheet.create({
   star: { marginBottom: 20, alignSelf: 'center' },
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   modalContent: {
      backgroundColor: 'white',
      borderRadius: 10,
      marginHorizontal: 20,
      padding: 40,
      position: 'relative',
   },
   close: {
      position: 'absolute',
      color: style['color-primary-shade'],
      top: 4,
      right: 8,
      fontSize: 32,
   },
});

export default ReviewPopup;
