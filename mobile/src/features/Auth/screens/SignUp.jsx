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

const SignUp = ({ navigation }) => {
   const { control, handleSubmit } = useForm();

   const { isCreating, createUser } = useCreateUser();

   const password = useWatch({ control, name: 'password' });

   const onButtonPressed = async data => {
      createUser({ ...data }, { onSuccess: navigation.navigate('SignIn') });
   };

   return (
      <SafeAreaView style={styles.container}>
         <KeyboardAwareScrollView>
            <Logo />
            <Text style={header_primary}>Sign Up now!</Text>
            <View style={styles.form}>
               <UserInput
                  control={control}
                  icon='mail-open-outline'
                  name='email'
                  rules={{ required: 'Email address is required.' }}
               />
               <UserInput
                  control={control}
                  name='password'
                  icon='key-outline'
                  secureTextEntry={true}
                  disabled={isCreating}
                  rules={{
                     required: 'Password is required.',
                     minLength: { value: 8, message: 'Password should be minimum 8 characters long.' },
                  }}
               />
               <UserInput
                  control={control}
                  name='passwordAgain'
                  icon='key-outline'
                  secureTextEntry={true}
                  disabled={isCreating}
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
                  rules={{ required: 'Please provide us your full name.' }}
               />
               <UserInput
                  control={control}
                  disabled={isCreating}
                  name='phone'
                  icon='call-outline'
                  rules={{ required: 'Please provide us your phone number.' }}
               />

               <Button onLoading={isCreating} handleSubmit={handleSubmit(onButtonPressed)}>
                  Sign up
               </Button>
            </View>
            <Button circle={true} handleSubmit={() => navigation.navigate('SignIn')}>
               <Text style={styles.signText}>&uarr;</Text>
            </Button>
         </KeyboardAwareScrollView>
      </SafeAreaView>
   );
};

SignUp.propTypes = {
   navigation: PropTypes.object,
};

export default SignUp;
