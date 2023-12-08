import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { header_primary } from '../../../styles/style';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/Button';

const PersonalDetails = ({ control, handleSubmit, handleSave }) => {
   const { user } = useAuth();

   return (
      <SafeAreaView style={styles.container}>
         <Text style={header_primary}>Edit your personal data</Text>
         <View style={styles.form}>
            <View style={styles.formGroup}>
               <FloatingLabelInput
                  control={control}
                  name='email'
                  label='E-mail address'
                  autoCapitalize='none'
                  placeholder={user.email}
               />
               <FloatingLabelInput
                  control={control}
                  name='fullName'
                  label='Your name'
                  autoCapitalize='none'
                  placeholder={user.fullName}
               />
            </View>
            <View style={styles.formGroup}>
               <FloatingLabelInput
                  control={control}
                  name='phone'
                  label='Phone number'
                  autoCapitalize='none'
                  placeholder={user.phone.toString()}
               />
            </View>
         </View>
         <Button handleSubmit={handleSubmit(handleSave)}>Save</Button>
      </SafeAreaView>
   );
};

PersonalDetails.propTypes = {
   control: PropTypes.object,
   handleSave: PropTypes.func,
   handleSubmit: PropTypes.func,
};
const styles = StyleSheet.create({
   container: {
      marginHorizontal: 20,
   },
   form: { gap: 20, marginVertical: 50 },
   formGroup: {
      flexDirection: 'row',
      gap: 20,
      alignItems: 'center',
      justifyContent: 'center',
   },
});
export default PersonalDetails;
