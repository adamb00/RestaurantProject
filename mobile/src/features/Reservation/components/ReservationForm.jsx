import React, { useState } from 'react';
import { View, SafeAreaView, Text, Pressable, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDateForm } from '../hooks/useDateForm';

import Button from '../../../components/Button';
import UserInput from '../../../components/UserInput';
import { header_primary, header_secondary } from '../../../styles/style';
import DatePicker from './DatePicker';
import { useAuth } from '../../../contexts/AuthContext';
import { useSendReservation } from '../hooks/useReservation';
import Dropdown from './Dropdown';

const ReservationForm = () => {
   const { onDateChange, selectedDate } = useDateForm();
   const { sendReservation, isSending } = useSendReservation();

   const [showPicker, setShowPicker] = useState(false);
   const { control, handleSubmit, watch } = useForm();

   const guests = watch('numOfGuests');

   const { user } = useAuth();

   const onSubmitFormData = data => {
      const localSelectedDate = selectedDate;
      const utcSelectedDate = new Date(localSelectedDate);

      data.selectedDate = utcSelectedDate.setMinutes(localSelectedDate.getMinutes() + 120);
      data.needMenu = guests > 9 ? true : data.needMenu.key;
      data.user = user._id;

      sendReservation(data);
   };

   const toggleDatePicker = () => {
      setShowPicker(!showPicker);
   };

   return (
      <SafeAreaView>
         <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <Text style={header_primary}>Do you want to reserve a table?</Text>
            <Text style={header_secondary}>Please fill the form below</Text>
            <View style={styles.form}>
               <UserInput
                  control={control}
                  name='numOfGuests'
                  icon='person-add-outline'
                  keyboardType='numeric'
                  rules={{ required: 'Please provide us the number of guests' }}
               />
               <Dropdown guests={+guests} control={control} />
               <UserInput
                  control={control}
                  name='message'
                  icon='chatbox-outline'
                  multiline={[true, 5]}
                  rules={{ required: 'Please provide us the number of guests' }}
               />

               {!showPicker && (
                  <Pressable onPress={toggleDatePicker}>
                     <UserInput
                        control={control}
                        name='selectedDate'
                        icon='calendar-outline'
                        onPressIn={toggleDatePicker}
                     />
                  </Pressable>
               )}
               {showPicker && (
                  <DatePicker setShowPicker={setShowPicker} onDateChange={onDateChange} selectedDate={selectedDate} />
               )}

               <Button onLoading={isSending} handleSubmit={handleSubmit(onSubmitFormData)}>
                  Submit form
               </Button>
            </View>
         </KeyboardAwareScrollView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      marginVertical: 50,
   },
   form: {
      flex: 1,
      display: 'flex',
      marginVertical: 50,
      marginHorizontal: 20,
      gap: 15,
      width: '90%',
      alignSelf: 'center',
   },
});

export default ReservationForm;
