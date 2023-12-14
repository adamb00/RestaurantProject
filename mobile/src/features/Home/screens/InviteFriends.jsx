import React from 'react';

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../components/Icon';
import { useNavigation } from '@react-navigation/native';
import { header_primary, style } from '../../../styles/style';
import { formatCurrency } from '../../../helpers/config';

// import { APP_ID } from '../../../../config.json';
import Share from 'react-native-share';

const InviteFriends = () => {
   const navigation = useNavigation();

   const handleShare = async () => {
      const shareOptions = {
         message: 'This is a message',
      };

      try {
         const shareRes = await Share.open(shareOptions);
         console.log(shareRes);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <ScrollView style={{ marginVertical: 50 }}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
            <Icon name='close-circle-outline' form={false} style={styles.icon} />
         </TouchableOpacity>
         <Text style={header_primary}>Invite your friends for more discount!</Text>
         <Text>
            Invite one of your friends and from now if both you and your friend buy from us at least{' '}
            {formatCurrency(10000)}, both of you will get 10% discount!
         </Text>

         <View style={styles.iconList}>
            <TouchableOpacity onPress={handleShare}>
               <Icon name='logo-facebook' form={false} style={[styles.icon, styles.facebookIcon]} />
            </TouchableOpacity>
            <TouchableOpacity>
               <Icon name='chatbox-ellipses-outline' form={false} style={[styles.icon]} />
            </TouchableOpacity>
            <TouchableOpacity>
               <Icon name='logo-whatsapp' form={false} style={[styles.icon, styles.whatsappIcon]} />
            </TouchableOpacity>
            <TouchableOpacity>
               <Icon name='call-outline' form={false} style={[styles.icon, styles.viberIcon]} />
            </TouchableOpacity>
         </View>
      </ScrollView>
   );
};

InviteFriends.propTypes = {};
const styles = StyleSheet.create({
   iconList: {
      flexDirection: 'row',
      gap: 20,
      justifyContent: 'center',
      marginTop: 20,
   },
   goBack: {
      position: 'absolute',
      zIndex: 200,
      left: 10,
      top: 0,
   },
   icon: {
      fontSize: 44,
   },
   facebookIcon: {
      color: style['color-facebook'],
   },
   whatsappIcon: {
      color: style['color-whatsapp'],
   },
   viberIcon: {
      color: style['color-viber'],
   },
});
export default InviteFriends;
