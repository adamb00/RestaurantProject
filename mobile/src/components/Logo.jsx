import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import LogoImage from '../../assets/logo.png';

const Logo = () => {
   return (
      <View style={styles.container}>
         <Image source={LogoImage} style={styles.logo} />
      </View>
   );
};

export default Logo;

const styles = StyleSheet.create({
   container: {
      justifyContent: 'center',
      alignItems: 'center',
   },
   logo: {
      width: 150,
      height: 150,
      marginVertical: 50,
   },
});
