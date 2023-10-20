import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocation } from '../../../contexts/LocationContext';
import LogoImage from '../../../../assets/bandula_logo_png.png';
import { shadowProp, style } from '../../../styles/style';
import MapView, { Marker } from 'react-native-maps';
import { ZOOM_LEVEL } from '../../../helpers/config';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import Icon from '../../../components/Icon';
import FloatingLabelInput from '../../../components/FloatingLabelInput';

const EditOrderAddressForm = ({ setAddress, address }) => {
   const { postalCode, city, street, streetNumber } = address;
   const { latitude, longitude } = useLocation();
   const { control } = useForm();

   const [isEditing, setIsEditing] = useState(false);

   const handleEditClick = async () => {
      setIsEditing(isEditing => !isEditing);
   };

   return (
      <SafeAreaView>
         <View style={shadowProp}>
            <MapView
               style={styles.map}
               region={{
                  latitude,
                  longitude,
                  latitudeDelta: ZOOM_LEVEL,
                  longitudeDelta: ZOOM_LEVEL,
               }}
            >
               <Marker
                  coordinate={{ latitude, longitude }}
                  title='Your Position'
                  description={`${postalCode} ${city}, ${street} ${streetNumber}`}
               >
                  <Image source={LogoImage} style={styles.markerImage} />
               </Marker>
            </MapView>
            <View style={styles.container}>
               <View style={styles.addressContainer}>
                  <View style={styles.addressContainerWrapper}>
                     <Icon name='map-outline' form={false} />
                     {isEditing ? (
                        <View>
                           <View style={styles.addressInputContainer}>
                              <FloatingLabelInput
                                 label='Address'
                                 control={control}
                                 name='street'
                                 initialValue={street}
                                 onChangeText={street => setAddress({ ...address, street })}
                              />
                              <FloatingLabelInput
                                 label='House number'
                                 control={control}
                                 name='streetNumber'
                                 initialValue={streetNumber}
                                 onChangeText={streetNumber => setAddress({ ...address, streetNumber })}
                              />
                           </View>
                           <View style={styles.addressInputContainer}>
                              <FloatingLabelInput
                                 label='City'
                                 control={control}
                                 name='city'
                                 initialValue={city}
                                 onChangeText={city => setAddress({ ...address, city })}
                              />
                              <FloatingLabelInput
                                 label='ZIP'
                                 control={control}
                                 name='postalCode'
                                 initialValue={postalCode}
                                 onChangeText={postalCode => setAddress({ ...address, postalCode })}
                              />
                           </View>
                        </View>
                     ) : (
                        <View>
                           <Text style={styles.street}>
                              {street} {streetNumber}
                           </Text>
                           <Text>
                              {postalCode} {city}
                           </Text>
                        </View>
                     )}
                  </View>

                  <TouchableOpacity onPress={handleEditClick}>
                     <Icon name='pencil-outline' form={false} />
                  </TouchableOpacity>
               </View>
               <View style={styles.wrapper}>
                  <FloatingLabelInput
                     label='Floor'
                     control={control}
                     name='floor'
                     onChangeText={floor => setAddress({ ...address, floor })}
                  />
               </View>
               <View style={styles.wrapper}>
                  <FloatingLabelInput
                     label='Door'
                     control={control}
                     name='door'
                     onChangeText={door => setAddress({ ...address, door })}
                  />
               </View>
               <View style={styles.wrapper}>
                  <FloatingLabelInput
                     label='Door Ring'
                     control={control}
                     name='ring'
                     onChangeText={ring => setAddress({ ...address, ring })}
                  />
               </View>
            </View>
         </View>
      </SafeAreaView>
   );
};

EditOrderAddressForm.propTypes = {
   setAddress: PropTypes.func,
   address: PropTypes.object,
};
const styles = StyleSheet.create({
   container: {
      backgroundColor: 'white',
      borderTopLeftRadius: style['default-border-radius'],
      borderTopRightRadius: style['default-border-radius'],
      marginHorizontal: 20,
      transform: [{ translateY: -40 }],
      padding: 30,
   },
   addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
      borderBottomWidth: style['default-boder-width'],
      borderBottomColor: style['color-light-grey-2'],
      marginBottom: 10,
   },
   addressContainerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
   },
   addressInputContainer: {
      flexDirection: 'row',
      gap: 20,
   },
   wrapper: {
      gap: 5,
      marginBottom: 20,
   },
   street: {
      fontWeight: 'bold',
      fontSize: 16,
   },
   name: {
      fontSize: 18,
   },
   map: {
      height: '40%',
      marginHorizontal: 20,
   },
   markerImage: {
      width: 35,
      height: 35,
   },
});
export default EditOrderAddressForm;
