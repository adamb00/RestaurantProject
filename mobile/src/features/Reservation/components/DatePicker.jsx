import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import PropTypes from 'prop-types';

import { style } from '../../../styles/style';
import Button from '../../../components/Button';
import { StyleSheet, View } from 'react-native';

const DatePicker = ({ setShowPicker, onDateChange, selectedDate }) => {
   const [mode, setMode] = useState('date');

   const saveDate = () => {
      if (mode === 'date') {
         setMode('time');
      } else {
         setMode('date');
         setShowPicker(false);
      }
   };
   const cancelDate = () => {
      if (mode === 'date') setShowPicker(false);
      else setMode('date');
   };

   const maxDate = new Date();
   maxDate.setFullYear(maxDate.getFullYear() + 1);

   return (
      <>
         <DateTimePicker
            value={selectedDate || new Date()}
            onChange={(e, date) => {
               onDateChange(e, date);
            }}
            mode={mode}
            display='spinner'
            minimumDate={new Date(Date.now())}
            maximumDate={maxDate}
            locale='hu-HU'
            minuteInterval={30}
         />
         <View style={styles.datePickerSubmit}>
            <Button handleSubmit={cancelDate} colors={[style['color-light-grey-2'], style['color-light-grey-2']]}>
               {mode === 'time' ? 'Back' : 'Cancel'}
            </Button>
            <Button handleSubmit={saveDate} colors={[style['color-light-grey-2'], style['color-light-grey-2']]}>
               {mode === 'time' ? 'Save' : 'Next'}
            </Button>
         </View>
      </>
   );
};

DatePicker.propTypes = {
   setShowPicker: PropTypes.func,
   onDateChange: PropTypes.func,
   selectedDate: PropTypes.any,
};

const styles = StyleSheet.create({
   datePickerSubmit: {
      flexDirection: 'row',
      justifyContent: 'center',
   },
});

export default DatePicker;
