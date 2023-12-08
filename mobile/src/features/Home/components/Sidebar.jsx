import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { style } from '../../../styles/style';
import Icon from '../../../components/Icon';
import { useLogoutUser } from '../../Auth/hooks/useUserAuth';
import { useNavigation } from '@react-navigation/native';

const Sidebar = ({ sidebarPosition, closeSidebar }) => {
   const navigation = useNavigation();
   const { singoutUser } = useLogoutUser();

   useEffect(() => {
      const unsubscribe = navigation.addListener('blur', () => {
         closeSidebar();
      });

      return unsubscribe;
   }, [navigation, closeSidebar]);

   const handleSubmit = item => {
      switch (item) {
         case 'previousOrders':
            navigation.navigate('PreviousOrders');
            break;
         case 'signout':
            singoutUser();
            break;
         case 'settings':
            navigation.navigate('Settings');
            break;
         case 'coupons':
            navigation.navigate('Coupons');
            break;
      }
   };

   return (
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarPosition }] }]}>
         <TouchableOpacity style={styles.sidebarItem} onPress={() => handleSubmit('previousOrders')}>
            <Icon name='clipboard-outline' form={false} />
            <Text style={styles.sidebarText}>Previous Orders</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.sidebarItem} onPress={() => handleSubmit('reservations')}>
            <Icon name='bookmarks-outline' form={false} />
            <Text style={styles.sidebarText}>My Reservations</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.sidebarItem} onPress={() => handleSubmit('coupons')}>
            <Icon name='ribbon-outline' form={false} />
            <Text style={styles.sidebarText}>Coupons</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.sidebarItem} onPress={() => handleSubmit('settings')}>
            <Icon name='settings-outline' form={false} />
            <Text style={styles.sidebarText}>Settings</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.sidebarItem} onPress={() => handleSubmit('invite')}>
            <Icon name='gift-outline' form={false} />
            <Text style={styles.sidebarText}>Invite Friends</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.sidebarItem} onPress={() => handleSubmit('signout')}>
            <Icon name='log-out-outline' form={false} />
            <Text style={styles.sidebarText}>Sign out</Text>
         </TouchableOpacity>
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   sidebar: {
      maxWidth: '100%',
      height: '100%',
      backgroundColor: 'white',
   },
   sidebarItem: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: style['default-boder-width'],
      borderColor: style['color-primary'],
      gap: 15,
      padding: 20,
   },
   sidebarText: {
      fontSize: 18,
      color: style['color-secondary-shade'],
   },
});

Sidebar.propTypes = {
   sidebarPosition: PropTypes.object,
   closeSidebar: PropTypes.func,
};

export default Sidebar;
