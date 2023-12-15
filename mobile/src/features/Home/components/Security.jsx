import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import { header_primary } from '../../../styles/style';
import Button from '../../../components/Button';

const Security = ({ control, handleSave, handleSubmit, userType }) => {
   if (userType === 'facebook') return <Text style={header_primary}>This page is not for facebook users!</Text>;
   return (
      <SafeAreaView style={styles.container}>
         <Text style={header_primary}>Edit your personal data</Text>
         <View style={styles.form}>
            <View style={styles.formGroup}>
               <FloatingLabelInput
                  control={control}
                  name='currentPassword'
                  label='Current password'
                  autoCapitalize='none'
                  placeholder='Your current password'
                  secureTextEntry={true}
               />
            </View>
            <View style={styles.formGroup}>
               <FloatingLabelInput
                  control={control}
                  name='password'
                  label='New password'
                  autoCapitalize='none'
                  placeholder='New password'
                  secureTextEntry={true}
                  rules={{ minLength: { value: 8, message: 'Password should be minimum 8 characters long.' } }}
               />
               <FloatingLabelInput
                  control={control}
                  name='passwordAgain'
                  label='New password again'
                  autoCapitalize='none'
                  placeholder='New password again'
                  secureTextEntry={true}
               />
            </View>
         </View>
         <Button handleSubmit={handleSubmit(handleSave)}>Save</Button>
      </SafeAreaView>
   );
};

Security.propTypes = {
   control: PropTypes.object,
   handleSave: PropTypes.func,
   handleSubmit: PropTypes.func,
   userType: PropTypes.string,
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
export default Security;
