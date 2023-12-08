import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { View, TextInput, Text, StyleSheet } from 'react-native';
import { style } from '../styles/style';
import { Controller } from 'react-hook-form';

const FloatingLabelInput = ({
   control,
   rules = {},
   name,
   label,
   initialValue,
   onChangeText,
   secureTextEntry = false,
   placeholder,
}) => {
   const [isFocused, setIsFocused] = useState(false);

   const handleFocus = () => {
      setIsFocused(true);
   };

   const handleBlur = () => {
      if (!initialValue) {
         setIsFocused(false);
      }
   };

   return (
      <View>
         <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value = initialValue, onChange }, fieldState: { error } }) => (
               <>
                  <View style={styles.container}>
                     <View style={styles.inputContainer}>
                        <TextInput
                           value={value}
                           onChangeText={text => {
                              onChange(text);
                              if (onChangeText) {
                                 onChangeText(text);
                              }
                           }}
                           onFocus={handleFocus}
                           onBlur={handleBlur}
                           style={styles.input}
                           secureTextEntry={secureTextEntry}
                           placeholder={placeholder}
                        />
                        <Text style={[styles.label, isFocused || value ? styles.labelFocused : null]}>{label}</Text>
                     </View>
                  </View>
                  {error && <Text style={styles.errorText}>{error.message || 'Error'}</Text>}
               </>
            )}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      marginVertical: 10,
   },
   inputContainer: {
      borderWidth: style['default-boder-width'],
      borderColor: style['color-primary'],
      borderRadius: style['default-border-radius'],
      position: 'relative',
   },
   input: {
      fontSize: 16,
      paddingVertical: 15,
      minWidth: 250,
      paddingHorizontal: 8,
   },
   label: {
      fontSize: 14,
      position: 'absolute',
      top: -8,
      left: 10,
      color: style['color-primary-shade'],
      backgroundColor: style['color-light-grey'],
      paddingHorizontal: 5,
   },
   labelFocused: {
      color: style['color-primary-tint'],
   },

   errorText: {
      color: style['color-error'],
      alignSelf: 'stretch',
   },
});

FloatingLabelInput.propTypes = {
   label: PropTypes.string,
   initialValue: PropTypes.string,
   onChangeText: PropTypes.func,
   name: PropTypes.string.isRequired,
   control: PropTypes.object,
   rules: PropTypes.object,
   secureTextEntry: PropTypes.bool,
   placeholder: PropTypes.string,
};

export default FloatingLabelInput;
