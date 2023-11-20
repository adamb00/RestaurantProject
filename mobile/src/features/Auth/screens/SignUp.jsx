import React from 'react';
import PropTypes from 'prop-types';
import { useForm, useWatch } from 'react-hook-form';
import { SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Logo from '../../../components/Logo';
import UserInput from '../../../components/UserInput';
import Button from '../../../components/Button';

import { styles } from '../styles/AuthStyle';
import { header_primary } from '../../../styles/style';

import { useCreateUser } from '../hooks/useUserAuth';
import ButtonCircle from '../../../components/ButtonCircle';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import Icon from '../../../components/Icon';

const SignUp = ({ navigation }) => {
   const { control, handleSubmit } = useForm();
   const { isPasswordVisible, togglePasswordVisibility } = useTogglePasswordVisibility(false);

   const { isCreating, createUser } = useCreateUser();

   const password = useWatch({ control, name: 'password' });

   const onButtonPressed = async data => {
      createUser({ ...data }, { onSuccess: navigation.navigate('SignIn') });
   };

   return (
      <SafeAreaView style={styles.container}>
         <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <Logo />
            <Text style={header_primary}>Sign Up now!</Text>
            <View style={styles.form}>
               <UserInput
                  control={control}
                  icon='mail-open-outline'
                  name='email'
                  placeholder='Please provide us Your e-mail address'
                  rules={{ required: 'Email address is required.' }}
               />
               <View style={styles.passwordContainer}>
                  <UserInput
                     control={control}
                     name='password'
                     icon='key-outline'
                     secureTextEntry={!isPasswordVisible}
                     disabled={isCreating}
                     placeholder='We also need a password'
                     rules={{
                        required: 'Password is required.',
                        minLength: { value: 8, message: 'Password should be minimum 8 characters long.' },
                     }}
                  />
                  <Icon
                     name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                     style={styles.icon}
                     handleOnPress={togglePasswordVisibility}
                  />
               </View>
               <UserInput
                  control={control}
                  name='passwordAgain'
                  icon='key-outline'
                  secureTextEntry={!isPasswordVisible}
                  disabled={isCreating}
                  placeholder='You need to confirm the previous'
                  rules={{
                     required: 'Please confirm your password',
                     validate: value => value === password || 'The passwords do not match',
                  }}
               />

               <UserInput
                  control={control}
                  disabled={isCreating}
                  name='fullName'
                  icon='person-outline'
                  autoCapitalize='words'
                  placeholder='Please provide us Your name'
                  rules={{ required: 'Please provide us Your full name.' }}
               />
               <UserInput
                  control={control}
                  disabled={isCreating}
                  name='phone'
                  icon='call-outline'
                  placeholder='Please provide us Your phone number'
                  rules={{ required: 'Please provide us your phone number.' }}
               />

               <Button onLoading={isCreating} handleSubmit={handleSubmit(onButtonPressed)}>
                  Sign up
               </Button>
            </View>
            <ButtonCircle handleSubmit={() => navigation.navigate('SignIn')}>
               <Text style={styles.signText}>&uarr;</Text>
            </ButtonCircle>
         </KeyboardAwareScrollView>
      </SafeAreaView>
   );
};

SignUp.propTypes = {
   navigation: PropTypes.object,
};

export default SignUp;
