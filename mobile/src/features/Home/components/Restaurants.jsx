import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { header_primary, style } from '../../../styles/style';

const Restaurants = () => {
   const screenWidth = Dimensions.get('window').width;

   const imageWidth = { width: screenWidth < 800 ? '100%' : '22%' };

   return (
      <SafeAreaView style={styles.container}>
         <Text style={header_primary}>Check our restaurants!</Text>
         <View style={[styles.row, { flexDirection: screenWidth < 800 ? 'column' : 'row' }]}>
            <View style={[styles.imageContainer, imageWidth]}>
               <Image source={require('../../../../assets/bandula_png.png')} style={styles.image} />
            </View>
            <View style={[styles.imageContainer, imageWidth]}>
               <Image source={require('../../../../assets/bandula_png.png')} style={styles.image} />
            </View>
            <View style={[styles.imageContainer, imageWidth]}>
               <Image source={require('../../../../assets/bandula_png.png')} style={styles.image} />
            </View>

            <View style={[styles.imageContainer, imageWidth]}>
               <Image source={require('../../../../assets/bandula_png.png')} style={styles.image} />
            </View>
         </View>
         <View style={[styles.row, { flexDirection: screenWidth < 800 ? 'column' : 'row' }]}>
            <View style={[styles.imageContainer, imageWidth]}>
               <Image source={require('../../../../assets/bandula_png.png')} style={styles.image} />
            </View>
            <View style={[styles.imageContainer, imageWidth]}>
               <Image source={require('../../../../assets/bandula_png.png')} style={styles.image} />
            </View>
            <View style={[styles.imageContainer, imageWidth]}>
               <Image source={require('../../../../assets/bandula_png.png')} style={styles.image} />
            </View>

            <View style={[styles.imageContainer, imageWidth]}>
               <Image source={require('../../../../assets/bandula_png.png')} style={styles.image} />
            </View>
         </View>
      </SafeAreaView>
   );
};

Restaurants.propTypes = {};
const styles = StyleSheet.create({
   container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      justifyContent: 'space-between',
      marginBottom: 150,
   },
   row: {
      display: 'flex',
      justifyContent: 'space-evenly',
      marginHorizontal: 20,
      gap: 20,
   },

   imageContainer: {
      borderRadius: style['default-border-radius'],
      borderWidth: style['default-boder-width'],
      borderColor: style['color-primary'],
      width: '22%',
      maxHeight: 250,
   },
   image: {
      width: '100%',
      maxHeight: 250,
      resizeMode: 'contain',
   },
});
export default Restaurants;
