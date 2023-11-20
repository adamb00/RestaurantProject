import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const BackgroundImage = ({ children, image }) => {
   return (
      <Image source={image} style={styles.backgroundImage}>
         {children}
      </Image>
   );
};

BackgroundImage.propTypes = {
   children: PropTypes.node,
   image: PropTypes.string,
};

const styles = StyleSheet.create({
   backgroundImage: {
      paddingHorizontal: 30,
      paddingVertical: 20,
      resizeMode: 'cover',
      display: 'flex',
   },
});
export default BackgroundImage;
