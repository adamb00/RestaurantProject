import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { icon, formIcon } from '../styles/style';

const Icon = ({ name, form = true, focused, style }) => {
   if (!form) return <IonIcon name={name} style={[icon(focused), style]} />;
   return (
      <TouchableOpacity>
         <IonIcon name={name} style={[formIcon, style]} />
      </TouchableOpacity>
   );
};

Icon.propTypes = {
   name: PropTypes.string,
   form: PropTypes.bool,
   focused: PropTypes.bool,
   style: PropTypes.object,
};
export default Icon;
