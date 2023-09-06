import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { style } from '../../../styles/style';

const OrderNavigation = ({ types, setScrollTo }) => {
   const [active, setActive] = useState('pizza');

   const handleOnClick = type => {
      setActive(type);
      setScrollTo(type.toLowerCase());
   };
   return (
      <ScrollView style={styles.nav} horizontal={true} showsHorizontalScrollIndicator={false}>
         {types.map((type, i) => (
            <TouchableOpacity
               key={i}
               style={[styles.navItem, active === type ? styles.navItemActive : '']}
               onPress={() => handleOnClick(type)}
            >
               <Text style={[styles.navText, active === type ? styles.navTextActive : '']}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
               </Text>
            </TouchableOpacity>
         ))}
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   nav: {
      flex: 1,
      flexDirection: 'row',
      gap: 5,
      borderBottomWidth: 1,
      borderBottomColor: style['color-light-grey-2'],
      position: 'fixed',
   },
   navText: {
      fontSize: 20,
      color: style['color-secondary-shade'],
   },
   navTextActive: {
      color: style['color-primary-shade'],
   },
   navItem: {
      marginHorizontal: 20,
      padding: 10,
   },
   navItemActive: {
      borderBottomColor: style['color-primary-shade'],
      borderBottomWidth: 2,
   },
});

OrderNavigation.propTypes = {
   types: PropTypes.array,
   setScrollTo: PropTypes.func,
};

export default OrderNavigation;
