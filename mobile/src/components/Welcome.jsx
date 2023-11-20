import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { style } from '../styles/style';

const Welcome = () => {
   const { user } = useAuth();

   return (
      <View>
         <Text style={styles.welcomeText}>Welcome back {user.fullName.split(' ')[1]}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   welcomeText: {
      color: style['color-light-grey'],
      fontSize: 23,
      textTransform: 'uppercase',
      letterSpacing: 2,
      fontStyle: 'italic',
   },
});

export default Welcome;
