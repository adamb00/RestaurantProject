import React from 'react';
import { Dimensions, Image, StyleSheet, Text } from 'react-native';
import { useGetFoodImage } from '../../Foods/hooks/useGetFoodImage';
import { header_primary, header_secondary, shadowProp, style } from '../../../styles/style';
import { View } from 'react-native';
import { useGetAllAds } from '../hooks/useAds';

const Ad = () => {
   const { ads } = useGetAllAds();
   const screenHeight = Dimensions.get('window').height;
   const screenWidth = Dimensions.get('window').width;

   if (ads.doc.length === 0) return null;
   const buffet = ads.doc.find(ad => ad.type === 'Svédasztal');
   const image = useGetFoodImage(buffet.image);

   return (
      <View>
         <Text style={header_primary}>{buffet.name}</Text>
         <Text style={header_secondary}>{buffet.description}</Text>
         <View style={[shadowProp, styles.imageContainer]}>
            <Image
               source={image}
               style={[styles.image, { height: screenWidth < 800 ? screenHeight / 2 : screenHeight }]}
            />
         </View>
      </View>
   );
};

Ad.propTypes = {};
const styles = StyleSheet.create({
   image: {
      width: Dimensions.get('window').width - 50,
      resizeMode: 'stretch',
      borderRadius: style['default-border-radius'],
      overflow: 'hidden',
   },
   imageContainer: {
      margin: 20,
      marginBottom: 150,
      justifyContent: 'center',
      alignItems: 'center',
   },
});
export default Ad;
