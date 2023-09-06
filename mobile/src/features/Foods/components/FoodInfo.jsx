import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from '../../../components/Icon';
import { style } from '../../../styles/style';
import { formatCurrency, glutenFree, lactoseFree } from '../../../helpers/config';

const FoodInfo = () => {
   const route = useRoute();
   const navigation = useNavigation();
   const food = route.params;

   return (
      <SafeAreaView>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
               <Icon name='close-circle-outline' form={false} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Detailed product description</Text>
         </View>
         <View style={styles.body}>
            <View style={styles.container}>
               <View style={styles.container_title}>
                  <Text style={styles.foodName}>{food.name}</Text>
                  <Text style={styles.foodPrice}>{formatCurrency(food.price)}</Text>
               </View>
               <Text style={styles.description}>{food.description}</Text>
            </View>
            <View style={styles.container}>
               <Text style={styles.headerElem}>More details</Text>
               <Text>{glutenFree(food)}</Text>
               <Text>{lactoseFree(food)}</Text>
            </View>
            <View style={styles.container}>
               <Text style={styles.headerElem}>Price information</Text>
               <Text style={styles.description}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book.
               </Text>
            </View>
         </View>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 30,
      borderBottomWidth: 1,
      paddingBottom: 10,
      paddingLeft: 10,
      borderBottomColor: style['color-light-grey-2'],
   },
   headerText: {
      fontSize: 18,
      fontWeight: '500',
   },
   body: {
      marginVertical: 20,
      marginHorizontal: 10,
   },
   headerElem: {
      fontSize: 20,
      fontWeight: '500',
      marginBottom: 10,
   },

   container: {
      borderBottomWidth: 1,
      borderBottomColor: style['color-light-grey-2'],
      marginBottom: 20,
      paddingBottom: 20,
   },

   container_title: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'space-between',
   },
   foodName: {
      fontWeight: '700',
      fontSize: 22,
   },
   foodPrice: {
      fontSize: 18,
      fontWeight: '500',
   },
   description: {
      marginTop: 10,
      fontSize: 16,
      color: style['color-dark-grey-2'],
   },
});

export default FoodInfo;
