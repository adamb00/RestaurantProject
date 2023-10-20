import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { style } from '../styles/style';

const ButtonEdit = ({ handleSubmit, onLoading, children }) => {
   return (
      <TouchableOpacity onPress={handleSubmit} disabled={onLoading} style={styles.button}>
         <Text>{onLoading ? 'Please wait...' : children}</Text>
      </TouchableOpacity>
   );
};

ButtonEdit.propTypes = {
   children: PropTypes.node,
   onLoading: PropTypes.bool,
   handleSubmit: PropTypes.func,
};
const styles = StyleSheet.create({
   button: {
      borderWidth: 1,
      borderColor: style['color-primary-shade'],
      paddingHorizontal: 12,
      paddingVertical: 6,
   },
});
export default ButtonEdit;
