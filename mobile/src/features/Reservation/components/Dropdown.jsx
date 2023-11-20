import React from 'react';
import PropTypes from 'prop-types';

import { Controller } from 'react-hook-form';
import { StyleSheet, View, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from '../../../components/Icon';
import { style } from '../../../styles/style';

const Dropdown = ({ guests, control }) => {
   return (
      <Controller
         control={control}
         name='needMenu'
         render={({ field: { onChange, onBlur } }) => (
            <View style={styles.dropdown}>
               <Icon name='restaurant-outline' />
               <SelectDropdown
                  data={[
                     { value: 'Yes', key: true },
                     { value: 'No', key: false },
                  ]}
                  onSelect={onChange}
                  onBlur={onBlur}
                  buttonStyle={styles.button}
                  buttonTextStyle={styles.buttonText}
                  buttonTextAfterSelection={selectedItem => {
                     return guests > 9 ? 'Yes' : selectedItem.value;
                  }}
                  dropdownStyle={styles.drop}
                  defaultButtonText='Do you need menu?'
                  renderCustomizedRowChild={item => <Text style={styles.rowText}>{item.value}</Text>}
                  renderDropdownIcon={isOpened => <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} form={false} />}
                  dropdownIconPosition='right'
                  disabled={guests > 9}
               />
            </View>
         )}
      />
   );
};

Dropdown.propTypes = {
   guests: PropTypes.number,
   control: PropTypes.object,
};

const styles = StyleSheet.create({
   button: {
      minHeight: 60,
      flex: 1,
      fontSize: 20,
      fontWeight: '500',
      paddingVertical: 5,
      paddingHorizontal: 8,
      borderColor: style['color-primary'],
      borderWidth: style['default-boder-width'],
      borderRadius: style['default-border-radius'],
      backgroundColor: 'inherit',
   },
   rowText: {
      color: style['color-primary'],
      textAlign: 'center',
      fontSize: 18,
   },
   buttonText: {
      color: style['color-dark-grey'],
      textAlign: 'left',
   },
   drop: {
      borderRadius: style['default-border-radius'],
   },
   dropdown: {
      flexDirection: 'row',
   },
});

export default Dropdown;
