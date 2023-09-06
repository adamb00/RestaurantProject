import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { style } from '../styles/style';
import { Controller } from 'react-hook-form';

import Icon from './Icon';

const UserInput = ({
   control,
   name,
   secureTextEntry = false,
   rules = {},
   autoCapitalize = 'none',
   icon,
   multiline = [],
   keyboardType = 'default',
   onPressIn,
}) => {
   return (
      <View>
         <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
               <>
                  <View style={styles.container}>
                     <Icon name={icon} />
                     <TextInput
                        multiline={multiline[0] ?? false}
                        numberOfLines={multiline[1] ?? 1}
                        value={value}
                        onChangeText={onChange}
                        autoCapitalize={autoCapitalize}
                        onBlur={onBlur}
                        onPressIn={onPressIn}
                        keyboardType={keyboardType}
                        style={[styles.input, error ? styles.error : styles.success]}
                        secureTextEntry={secureTextEntry}
                        placeholder={`Enter your ${name} here`}
                        textAlignVertical={multiline[0] ? 'top' : 'auto'}
                     />
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
      flexDirection: 'row',
   },

   errorText: {
      color: style['color-error'],
      alignSelf: 'stretch',
   },
   input: {
      flex: 1,
      fontSize: 20,
      fontWeight: 500,
      paddingVertical: 15,
      paddingHorizontal: 8,
      minHeight: 60,
      maxHeight: 150,
   },
   error: {
      borderWidth: style['default-boder-width'],
      borderRadius: style['default-border-radius'],
      borderColor: style['color-error'],
      color: style['color-error'],
   },
   success: {
      borderWidth: style['default-boder-width'],
      borderRadius: style['default-border-radius'],
      borderColor: style['color-primary'],
      color: style['color-primary-shade'],
   },
});

UserInput.propTypes = {
   name: PropTypes.string.isRequired,
   control: PropTypes.object,
   secureTextEntry: PropTypes.bool,
   rules: PropTypes.object,
   autoCapitalize: PropTypes.string,
   icon: PropTypes.string,
   multiline: PropTypes.array,
   keyboardType: PropTypes.string,
   onPressIn: PropTypes.func,
};

export default UserInput;
