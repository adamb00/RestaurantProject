import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { style } from '../styles/style';

const Header = ({ children }) => {
   return (
      <LinearGradient
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 1 }}
         colors={[style['color-primary'], style['color-primary-tint']]}
         style={styles.header}
      >
         <View style={styles.container}>{children}</View>
      </LinearGradient>
   );
};

const styles = StyleSheet.create({
   header: {
      borderRadius: 80,
      marginVertical: 20,
      marginHorizontal: 10,
   },
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 10,
      borderRadius: 30,
   },
});

Header.propTypes = {
   children: PropTypes.node,
};
export default Header;
