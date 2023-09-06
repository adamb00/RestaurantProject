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
      alignSelf: 'center',
      fontSize: 25,
      color: style['color-primary-shade'],
   },
});
