import React from 'react';
import PropTypes from 'prop-types';

import GoBackOrSaveHeader from '../../../components/GoBackOrSaveHeader';

import { useUpdateUser } from '../../Auth/hooks/useUserAuth';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useLocation } from '../../../contexts/LocationContext';

const EditOrderAddressHeader = ({ address }) => {
   const navigation = useNavigation();
   const { updateUser } = useUpdateUser();
   const { user, updateUser: updateUserContext } = useAuth();
   const { setReverseGeocodeResult } = useLocation();
   const handleSave = item => {
      updateUserContext({ ...user, address: item });
      updateUser(
         { ...user, address: item },
         {
            onSuccess: () => {
               navigation.navigate('OrderItems', { address: item });
            },
         }
      );
      setReverseGeocodeResult([item]);
   };

   return <GoBackOrSaveHeader handleSave={() => handleSave(address)} />;
};

EditOrderAddressHeader.propTypes = {
   address: PropTypes.object,
};

export default EditOrderAddressHeader;
