import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { style } from '../../../styles/style';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/Icon';
import SettingsActiveItem from '../components/SettingsActiveItem';
import { useNavigation } from '@react-navigation/native';
import { useGetFoodImage } from '../../Foods/hooks/useGetFoodImage';

const Settings = () => {
   const { user } = useAuth();
   const mobileView = Dimensions.get('window').width < 800;
   const [activeNavItem, setActiveNavItem] = useState('Personal Details');
   const navigation = useNavigation();

   const handleOnPress = item => {
      setActiveNavItem(item.name);
   };

   const image = useGetFoodImage('pizza_image.jpg');

   if (mobileView) {
      return (
         <View>
            <ImageBackground source={image} resizeMode='cover'>
               <View style={styles.header}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
                     <Icon name='close-circle-outline' form={false} style={styles.icon} />
                  </TouchableOpacity>
                  <Text style={styles.userName}>Welcome {user.fullName}</Text>
                  <Text style={styles.points}>Available points: {user.points}</Text>
               </View>
            </ImageBackground>
            <View style={[styles.sidebar, { marginHorizontal: 20 }]}>
               <TouchableOpacity style={[styles.sidebarGroup, { justifyContent: 'space-between' }]}>
                  <View style={styles.sidebarGroupItem}>
                     <Icon form={false} name='person-outline' />
                     <Text style={[styles.sidebarText, { fontSize: mobileView ? 16 : 20 }]}>Personal Details</Text>
                  </View>
                  <Icon form={false} name='chevron-forward-outline' />
               </TouchableOpacity>
               <TouchableOpacity style={[styles.sidebarGroup, { justifyContent: 'space-between' }]}>
                  <View style={styles.sidebarGroupItem}>
                     <Icon form={false} name='finger-print-outline' />
                     <Text style={[styles.sidebarText, { fontSize: mobileView ? 16 : 20 }]}>Security</Text>
                  </View>
                  <Icon form={false} name='chevron-forward-outline' />
               </TouchableOpacity>
               <TouchableOpacity style={[styles.sidebarGroup, { justifyContent: 'space-between' }]}>
                  <View style={styles.sidebarGroupItem}>
                     <Icon form={false} name='rocket-outline' />
                     <Text style={[styles.sidebarText, { fontSize: mobileView ? 16 : 20 }]}>User points</Text>
                  </View>
                  <Icon form={false} name='chevron-forward-outline' />
               </TouchableOpacity>
               <TouchableOpacity style={[styles.sidebarGroup, { justifyContent: 'space-between' }]}>
                  <View style={styles.sidebarGroupItem}>
                     <Icon form={false} name='ribbon-outline' />
                     <Text style={[styles.sidebarText, { fontSize: mobileView ? 16 : 20 }]}>Coupons</Text>
                  </View>
                  <Icon form={false} name='chevron-forward-outline' />
               </TouchableOpacity>
               <TouchableOpacity style={[styles.sidebarGroup, { justifyContent: 'space-between' }]}>
                  <View style={styles.sidebarGroupItem}>
                     <Icon form={false} name='flash-outline' />
                     <Text style={[styles.sidebarText, { fontSize: mobileView ? 16 : 20 }]}>Rules</Text>
                  </View>
                  <Icon form={false} name='chevron-forward-outline' />
               </TouchableOpacity>
            </View>
         </View>
      );
   }

   return (
      <View>
         <ImageBackground source={image} resizeMode='cover' style={{ height: 250 }}>
            <View style={styles.header}>
               <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
                  <Icon name='close-circle-outline' form={false} style={styles.icon} />
               </TouchableOpacity>
               <View style={styles.headerWrapper}>
                  <Text style={styles.userName}>Welcome {user.fullName}</Text>
                  <Text style={styles.points}>Available points: {user.points}</Text>
               </View>
            </View>
         </ImageBackground>

         <View style={styles.settingsContainer}>
            <View
               style={[
                  styles.sidebar,
                  {
                     paddingRight: 50,
                     paddingLeft: 20,
                     borderRightColor: style['color-light-grey-2'],
                     borderRightWidth: style['default-boder-width'],
                     height: '100%',
                     width: '25%',
                  },
               ]}
            >
               <TouchableOpacity
                  style={styles.sidebarGroup}
                  onPress={() => handleOnPress({ name: 'Personal Details' })}
               >
                  <Icon form={false} name='person-outline' />
                  <Text style={[styles.sidebarText, { fontSize: mobileView ? 16 : 20 }]}>Personal Details</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.sidebarGroup} onPress={() => handleOnPress({ name: 'Security' })}>
                  <Icon form={false} name='finger-print-outline' />
                  <Text style={[styles.sidebarText, { fontSize: mobileView ? 16 : 20 }]}>Security</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.sidebarGroup} onPress={() => handleOnPress({ name: 'User Points' })}>
                  <Icon form={false} name='rocket-outline' />
                  <Text style={[styles.sidebarText, { fontSize: mobileView ? 16 : 20 }]}>User points</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.sidebarGroup} onPress={() => handleOnPress({ name: 'Coupons' })}>
                  <Icon form={false} name='ribbon-outline' />
                  <Text style={[styles.sidebarText, { fontSize: mobileView ? 16 : 20 }]}>Coupons</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.sidebarGroup} onPress={() => handleOnPress({ name: 'Rules' })}>
                  <Icon form={false} name='flash-outline' />
                  <Text style={[styles.sidebarText, { fontSize: mobileView ? 16 : 20 }]}>Rules</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.settings}>
               <SettingsActiveItem activeNavItem={activeNavItem} />
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   headerContainer: {
      height: Dimensions.get('screen').height / 5,
   },
   headerWrapper: {
      width: '40%',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: style['default-border-radius'],
      backgroundColor: style['color-black'],
      opacity: 0.7,
   },
   header: {
      flex: 1,
      justifyContent: 'flex-end',
      marginVertical: 20,
      marginHorizontal: 30,
   },
   userName: {
      fontSize: 26,
      color: style['color-light-grey'],
   },
   points: {
      fontSize: 22,
      color: style['color-light-grey'],
   },

   settingsContainer: {
      flexDirection: 'row',
      height: '100%',
   },

   sidebar: {
      paddingVertical: 50,
      gap: 40,
   },

   sidebarGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingBottom: 10,
      borderBottomWidth: style['default-boder-width'],
      borderBottomColor: style['color-secondary-tint'],
   },

   sidebarGroupItem: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 5,
   },
   sidebarText: {
      color: style['color-secondary'],
   },
   settings: {
      width: '75%',
   },

   goBack: {
      position: 'absolute',
      zIndex: 200,
      left: 10,
      top: 20,
   },
   icon: {
      fontSize: 34,
      color: style['color-light-grey'],
   },
});
export default Settings;
