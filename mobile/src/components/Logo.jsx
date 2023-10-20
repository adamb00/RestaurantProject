import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import LogoImage from '../../assets/bandula_png.png';

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
      width: '100%',
   },
   logo: {
      width: 250,
      height: 180,
      marginVertical: 30,
   },
});
