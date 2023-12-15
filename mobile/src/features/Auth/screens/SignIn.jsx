import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-native-toast-message';

import { useForm } from 'react-hook-form';
import { SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Logo from '../../../components/Logo';
import UserInput from '../../../components/UserInput';
import Button from '../../../components/Button';
import ButtonCircle from '../../../components/ButtonCircle';

import { styles } from '../styles/AuthStyle';
import { header_primary } from '../../../styles/style';

import { useLoginUser, useLogoutUser } from '../hooks/useUserAuth';
import { useAuth } from '../../../contexts/AuthContext';
import { useLogoutUserIfTokenExpired } from '../hooks/useLogoutUserIfTokenExpired';
import Icon from '../../../components/Icon';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { useFacebookLogin } from '../hooks/useFacebookLogin';

const SignIn = ({ navigation }) => {
   const { control, handleSubmit } = useForm();
   const { loginUser, isLogging } = useLoginUser();
   const { signin } = useAuth();
   const { singoutUser } = useLogoutUser();
   const { isPasswordVisible, togglePasswordVisibility } = useTogglePasswordVisibility(false);

   const { request, promptAsync } = useFacebookLogin();

   const handleFacebookLogin = async () => {
      const res = await promptAsync();
      if (res.type !== 'success') {
         Toast.show({ type: 'error', text1: 'Uh-oh! Something went wrong! 🤯' });
         return;
      }
   };

   const onButtonPressed = data => {
      loginUser(
         { ...data },
         {
            onSuccess: data => {
               if (data.status === 'error') {
                  Toast.show({
                     type: 'error',
                     text1: data.message,
                  });
               }
               signin(data);
               useLogoutUserIfTokenExpired(data, singoutUser);
            },
            onError: error => {
               console.error(error.message);
            },
         }
      );
   };

   return (
      <SafeAreaView style={styles.container}>
         <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View>
               <Logo />
               <Text style={header_primary}>Welcome back</Text>
            </View>
            <View style={styles.form}>
               <UserInput
                  control={control}
                  name='email'
                  autoCapitalize='none'
                  icon='mail-open-outline'
                  placeholder='Your e-mail address'
                  rules={{ required: 'Email address is required.' }}
               />
               <View style={styles.passwordContainer}>
                  <UserInput
                     control={control}
                     name='password'
                     secureTextEntry={!isPasswordVisible}
                     icon='key-outline'
                     placeholder='Your password'
                     rules={{ required: 'Password is required.' }}
                  />
                  <Icon
                     name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                     style={styles.icon}
                     handleOnPress={togglePasswordVisibility}
                  />
               </View>
               <Button onLoading={isLogging} handleSubmit={handleSubmit(onButtonPressed)}>
                  Sign In
               </Button>
               <Button onLoading={!request} handleSubmit={handleFacebookLogin}>
                  Log in with facebook
               </Button>
            </View>
            <ButtonCircle handleSubmit={() => navigation.navigate('SignUp')}>
               <Text style={styles.signText}>&darr;</Text>
            </ButtonCircle>
         </KeyboardAwareScrollView>
      </SafeAreaView>
   );
};

SignIn.propTypes = {
   navigation: PropTypes.object,
};

export default SignIn;
