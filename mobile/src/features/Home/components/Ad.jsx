import React, { useState } from 'react';
import {
   Dimensions,
   Image,
   ImageBackground,
   Modal,
   SafeAreaView,
   StyleSheet,
   Text,
   TouchableOpacity,
} from 'react-native';
import { useGetFoodImage } from '../../Foods/hooks/useGetFoodImage';
import { header_primary, header_secondary, shadowProp, style } from '../../../styles/style';
import { View } from 'react-native';
import { useGetAllAds } from '../hooks/useAds';
import Icon from '../../../components/Icon';
// import useRemoveExpiredImages from '../hooks/useRemoveExpiredImages';

const Ad = () => {
   const { ads } = useGetAllAds();
   const screenHeight = Dimensions.get('window').height;
   const screenWidth = Dimensions.get('window').width;

   const [modalActive, setModalActive] = useState(false);

   if (ads.doc.length === 0) return null;
   const buffet = ads.doc.find(ad => ad.type === 'Svédasztal');

   // useRemoveExpiredImages(buffet);

   const image = useGetFoodImage(buffet.image);

   const handleOnPress = () => {
      setModalActive(true);
   };

   return (
      <View style={styles.container}>
         <Text style={header_primary}>{buffet.name}</Text>
         <Text style={header_secondary}>{buffet.description}</Text>
         <TouchableOpacity onPress={handleOnPress}>
            <View style={[shadowProp, styles.imageContainer]}>
               <Image
                  source={image}
                  style={[styles.image, { height: screenWidth < 800 ? screenHeight / 2 : screenHeight }]}
               />
            </View>
         </TouchableOpacity>

         {modalActive && (
            <SafeAreaView>
               <Modal transparent visible={modalActive} onRequestClose={() => setModalActive(false)}>
                  <View style={[styles.modalContent, shadowProp]}>
                     <ImageBackground
                        source={image}
                        resizeMode={screenWidth < 800 ? 'contain' : 'stretch'}
                        style={[styles.modalImage, { width: screenWidth < 800 ? screenWidth - 20 : screenWidth }]}
                     >
                        <TouchableOpacity onPress={() => setModalActive(false)}>
                           <Icon name='close-circle-outline' form={false} style={styles.icon} />
                        </TouchableOpacity>
                     </ImageBackground>
                  </View>
               </Modal>
            </SafeAreaView>
         )}
      </View>
   );
};

Ad.propTypes = {};
const styles = StyleSheet.create({
   modalContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
   },
   modalImage: {
      height: Dimensions.get('window').height,
      borderRadius: style['default-border-radius'],
      zIndex: 1,
   },
   icon: {
      position: 'absolute',
      top: 40,
      left: 20,
      color: style['color-primary'],
      zIndex: 2,
      fontSize: 44,
   },
   container: {
      marginVertical: 100,
   },

   modal: {
      position: 'relative',
   },

   image: {
      width: Dimensions.get('window').width - 50,
      resizeMode: 'stretch',
      borderRadius: style['default-border-radius'],
      overflow: 'hidden',
   },
   imageContainer: {
      marginTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
   },
});
export default Ad;
