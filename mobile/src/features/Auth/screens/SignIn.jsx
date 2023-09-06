import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Logo from '../../../components/Logo';
import UserInput from '../../../components/UserInput';
import Button from '../../../components/Button';

import { styles } from '../styles/AuthStyle';
import { header_primary } from '../../../styles/style';

import { useLoginUser } from '../hooks/useUserAuth';

const SignIn = ({ navigation }) => {
   const { control, handleSubmit } = useForm();
   const { loginUser, isLogging } = useLoginUser();

   const onButtonPressed = async data => {
      try {
         loginUser({ ...data });
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <KeyboardAwareScrollView>
            <View>
               <Logo />
               <Text style={header_primary}>Log in to your account</Text>
            </View>
            <View style={styles.form}>
               <UserInput
                  control={control}
                  name='email'
                  autoCapitalize='none'
                  icon='mail-open-outline'
                  rules={{ required: 'Email address is required.' }}
               />
               <UserInput
                  control={control}
                  name='password'
                  secureTextEntry={true}
                  icon='key-outline'
                  rules={{
                     required: 'Password is required.',
                  }}
               />
               <Button onLoading={isLogging} handleSubmit={handleSubmit(onButtonPressed)}>
                  Sign In
               </Button>
            </View>
            <Button circle={true} handleSubmit={() => navigation.navigate('SignUp')}>
               <Text style={styles.signText}>&darr;</Text>
            </Button>
         </KeyboardAwareScrollView>
      </SafeAreaView>
   );
};

SignIn.propTypes = {
   navigation: PropTypes.object,
};

export default SignIn;
