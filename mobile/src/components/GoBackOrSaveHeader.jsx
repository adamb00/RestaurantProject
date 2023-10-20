import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from './Icon';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';
import { style } from '../styles/style';

const GoBackOrSaveHeader = ({ handleSave, children }) => {
   const { handleSubmit } = useForm();
   const navigation = useNavigation();

   return (
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='close-circle-outline' form={false} />
         </TouchableOpacity>
         {children && <Text style={styles.headerText}>{children}</Text>}
         <TouchableOpacity onPress={handleSubmit(handleSave)}>
            <Icon name='checkmark-done-outline' form={false} />
         </TouchableOpacity>
      </View>
   );
};

GoBackOrSaveHeader.propTypes = {
   children: PropTypes.object,
   handleSave: PropTypes.func,
};

const styles = StyleSheet.create({
   header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      borderBottomWidth: 1,
      paddingBottom: 10,
      borderBottomColor: style['color-light-grey-2'],
   },
   headerText: {
      fontSize: 20,
      color: style['color-secondary'],
      fontWeight: '500',
   },
});
export default GoBackOrSaveHeader;
