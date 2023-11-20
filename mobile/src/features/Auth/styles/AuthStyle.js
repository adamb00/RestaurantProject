import { StyleSheet } from 'react-native';
import { style } from '../../../styles/style';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      marginHorizontal: 20,
   },
   form: { gap: 20, marginVertical: 50 },
   signText: {
      textAlign: 'center',
      fontSize: 30,
      color: style['color-primary-shade'],
   },

   icon: {
      position: 'absolute',
      right: -5,
      top: -58,
      borderWidth: 0,
      color: style['color-secondary-tint'],
   },
});
