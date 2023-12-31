import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { style } from '../styles/style';
import { LinearGradient } from 'expo-linear-gradient';

const Button = ({ children, handleSubmit, onLoading, colors = [], disabled = false, uniqueStyle }) => {
   return (
      <TouchableOpacity onPress={handleSubmit} disabled={onLoading || disabled}>
         <LinearGradient
            style={[styles.button, uniqueStyle]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={
               onLoading || disabled
                  ? [style['color-dark-grey-2'], style['color-dark-grey-2']]
                  : colors.length === 0
                  ? [style['color-primary'], style['color-primary-tint']]
                  : [colors[0], colors[1]]
            }
         >
            <Text style={onLoading || disabled ? styles.disabled : styles.font}>
               {onLoading ? 'Please wait...' : children}
            </Text>
         </LinearGradient>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   button: {
      borderRadius: style['default-border-radius'],
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginTop: 20,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
   },
   disabled: {
      textTransform: 'uppercase',
      fontSize: 20,
      letterSpacing: 4,
      color: style['color-dark-grey'],
   },
   font: {
      fontSize: 20,
      color: style['color-dark-grey-2'],
      textTransform: 'uppercase',
      letterSpacing: 4,
   },
   fontCircle: {
      fontSize: 20,
      color: style['color-dark-grey-2'],
   },
});

Button.propTypes = {
   children: PropTypes.node,
   onLoading: PropTypes.bool,
   handleSubmit: PropTypes.func,
   uniqueStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
   colors: PropTypes.array,
   disabled: PropTypes.bool,
};

export default Button;
