import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { style } from '../styles/style';

const Welcome = () => {
   const { user } = useAuth();

   return <View>{/* <Text style={styles.welcomeText}>Welcome {user.fullName.split(' ')[1]}</Text> */}</View>;
};

const styles = StyleSheet.create({
   welcomeText: {
      color: style['color-light-grey'],
      fontSize: 30,
      textTransform: 'uppercase',
      letterSpacing: 2,
      // fontFamily: 'Farsan',
   },
});

export default Welcome;
