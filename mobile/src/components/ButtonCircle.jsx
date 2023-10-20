import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { style } from '../styles/style';

const ButtonCircle = ({ children, handleSubmit, onLoading }) => {
   return (
      <TouchableOpacity onPress={handleSubmit} disabled={onLoading} style={styles.circle}>
         <Text style={styles.fontCircle}>{children}</Text>
      </TouchableOpacity>
   );
};

const BUTTON_SIZE = 60;

const styles = StyleSheet.create({
   circle: {
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
      borderRadius: BUTTON_SIZE / 2,
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: style['color-primary-tint'],
   },
   fontCircle: {
      textAlign: 'center',
      color: style['color-dark-grey-2'],
   },
});

ButtonCircle.propTypes = {
   children: PropTypes.node,
   onLoading: PropTypes.bool,
   handleSubmit: PropTypes.func,
   disabled: PropTypes.bool,
};

export default ButtonCircle;
