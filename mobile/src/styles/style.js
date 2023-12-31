import { Platform } from 'react-native';

export const style = {
   'color-primary': '#fe923f',
   'color-primary-tint': '#feb560',
   'color-primary-shade': '#985911',
   'color-secondary': '#3D0C02',
   'color-secondary-tint': '#77554e',
   'color-secondary-shade': '#2b0801',
   'color-light-grey': '#F5F5F5',
   'color-light-grey-2': '#E5E4E2',
   'color-dark-grey': '#8B8589',
   'color-dark-grey-2': '#555555',
   'color-white': '#fff',
   'color-black': '#000',
   'color-error': '#FF0800',
   'color-success': '#03C03C',

   'default-border-radius': 8,
   'default-boder-width': 1,
   'default-box-shadow-color': 'rgba(0, 0, 0, 0.35)',
};
export const header_primary = {
   textAlign: 'center',
   textTransform: 'uppercase',
   marginVertical: 25,
   fontSize: 32,
   fontWeight: '700',
   color: style['color-secondary-tint'],
};

export const header_secondary = {
   textAlign: 'center',
   fontSize: 26,
   color: style['color-primary-shade'],
};
export const header_tertiary = {
   marginLeft: 20,
   textAlign: 'left',
   fontSize: 26,
   color: style['color-primary'],
};
export const header_tertiary_center = {
   textAlign: 'center',
   marginBottom: 30,
   fontSize: 26,
   color: style['color-primary'],
};
export const header_quad_center = {
   textAlign: 'center',
   marginBottom: 30,
   fontSize: 22,
   color: style['color-secondary-shade'],
};

export const header_info = {
   fontSize: 18,
   textTransform: 'uppercase',
   color: style['color-primary-shade'],
   marginTop: 10,
   marginBottom: 5,
};

export const formIcon = {
   alignSelf: 'flex-start',
   marginRight: 5,
   color: style['color-primary-shade'],
   borderColor: style['color-primary-tint'],
   borderWidth: style['default-boder-width'],
   borderRadius: style['default-border-radius'],
   padding: 10,
   fontSize: 35,
};

export const icon = (focused = false) => ({
   fontSize: 25,
   color: focused ? style['color-primary-shade'] : style['color-primary'],
});

export const descText = {
   fontSize: 16,
   color: style['color-dark-grey-2'],
};

export const star = {
   marginTop: 5,
   marginLeft: -5,
};

export const shadowProp = Platform.select({
   ios: {
      shadowColor: style['default-box-shadow-color'],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 4,
   },
   android: {
      elevation: 8,
   },
});
