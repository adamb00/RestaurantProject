import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { icon, formIcon } from '../styles/style';

const Icon = ({ name, form = true, focused }) => {
   if (!form) return <IonIcon name={name} style={icon(focused)} />;
   return (
      <TouchableOpacity>
         <IonIcon name={name} style={formIcon} />
      </TouchableOpacity>
   );
};

Icon.propTypes = {
   name: PropTypes.string,
   form: PropTypes.bool,
   focused: PropTypes.bool,
};
export default Icon;
