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
   initialValue,
   multiline = [],
   keyboardType = 'default',
   onPressIn,
   onChangeText,
   placeholder,
}) => {
   return (
      <View>
         <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value = initialValue, onChange, onBlur }, fieldState: { error } }) => (
               <>
                  <View style={styles.container}>
                     {icon && <Icon name={icon} />}
                     <TextInput
                        multiline={multiline[0] ?? false}
                        numberOfLines={multiline[1] ?? 1}
                        value={value}
                        onChangeText={text => {
                           onChange(text);
                           if (onChangeText) {
                              onChangeText(text);
                           }
                        }}
                        autoCapitalize={autoCapitalize}
                        onBlur={onBlur}
                        onPressIn={onPressIn}
                        keyboardType={keyboardType}
                        style={[
                           name === 'orderMessage'
                              ? styles.inputMessage
                              : error
                              ? [styles.error, styles.input]
                              : [styles.success, styles.input],
                        ]}
                        secureTextEntry={secureTextEntry}
                        placeholder={placeholder}
                        placeholderTextColor={style['color-dark-grey']}
                        textAlignVertical={multiline[0] ? 'center' : 'auto'}
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
      fontWeight: '500',
      paddingVertical: 15,
      paddingHorizontal: 8,
      minHeight: 60,
      maxHeight: 150,
   },

   inputMessage: {
      marginVertical: 2,
      paddingVertical: 5,
      paddingHorizontal: 10,
      width: '80%',
      fontStyle: 'italic',
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
   onChangeText: PropTypes.func,
   initialValue: PropTypes.string,
   placeholder: PropTypes.string,
};

export default UserInput;
