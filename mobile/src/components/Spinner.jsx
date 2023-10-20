import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { style } from '../styles/style';

const Spinner = () => {
   const [color, setColor] = useState(style['color-primary-shade']);
   useEffect(() => {
      const id = setInterval(() => {
         setColor(color =>
            color == style['color-primary-shade'] ? style['color-primary'] : style['color-primary-shade']
         );
      }, 700);
      return () => clearInterval(id);
   }, []);
   return (
      <SafeAreaView style={styles.container}>
         <ActivityIndicator size='large' color={color} />
      </SafeAreaView>
   );
};

Spinner.propTypes = {};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      transform: [{ scaleX: 2 }, { scaleY: 2 }],
   },
});
export default Spinner;
