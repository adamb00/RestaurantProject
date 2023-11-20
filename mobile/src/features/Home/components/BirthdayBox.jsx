import React, { useState } from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { shadowProp, style } from '../../../styles/style';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../../../components/Button';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../../../contexts/AuthContext';
import PropTypes from 'prop-types';

import { useUpdateUser } from '../../Auth/hooks/useUserAuth';

const BirthdayBox = ({ sidebarIsOpen }) => {
   const { control, handleSubmit } = useForm();
   const [selectedDate, setSelectedDate] = useState(new Date());
   const { user, updateUser: updateUserInContext } = useAuth();
   const { updateUser } = useUpdateUser();
   const { sidebarIsOpen: open } = sidebarIsOpen;

   const handleDateChange = (event, selected) => {
      if (selected) {
         const timeZoneOffset = new Date().getTimezoneOffset();

         const adjustedDate = new Date(selected.getTime() + timeZoneOffset * 60000);

         setSelectedDate(adjustedDate);
      }
   };

   const handleOnClick = item => {
      item.birthday = selectedDate;
      updateUserInContext({ ...user, birthday: item.birthday });
      updateUser({ ...user, birthday: item.birthday });
   };

   return (
      <SafeAreaView style={[styles.container, shadowProp, open && { backgroundColor: 'rgba(0, 0, 0, 0.1)' }]}>
         <View style={styles.wrapper}>
            <Text style={styles.wrapperText}>As we know,</Text>
            <Text style={styles.wrapperText}>You not provided Your birthday for us, yet 😞</Text>
            <Text style={styles.wrapperText}>Do it now to get more discount! 🤩🤩</Text>
         </View>

         <Controller
            control={control}
            name='birthday'
            render={({ fieldState: { error } }) => (
               <>
                  <DateTimePicker
                     value={selectedDate}
                     mode='date'
                     display='spinner'
                     minimumDate={new Date(Date.UTC(1900, 0, 1))}
                     maximumDate={new Date()}
                     locale='hu-HU'
                     onChange={handleDateChange}
                  />
                  {error && <Text style={styles.errorText}>{error.message || 'Error'}</Text>}
               </>
            )}
         />

         <Button handleSubmit={handleSubmit(handleOnClick)}>Save</Button>
      </SafeAreaView>
   );
};

BirthdayBox.propTypes = {
   sidebarIsOpen: PropTypes.bool,
};
const styles = StyleSheet.create({
   container: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: style['color-light-grey'],
      borderRadius: style['default-border-radius'],
      margin: 20,
      gap: 20,
      paddingVertical: 20,

      minHeight: 200,
   },
   wrapper: {
      gap: 10,
      flexWrap: 'wrap',
   },
   wrapperText: {
      textAlign: 'center',
      fontSize: 18,
   },
});
export default BirthdayBox;
