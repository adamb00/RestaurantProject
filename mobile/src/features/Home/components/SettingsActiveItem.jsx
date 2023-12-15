import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../contexts/AuthContext';
import { useUpdateUser } from '../../Auth/hooks/useUserAuth';
import PersonalDetails from './PersonalDetails';
import Security from './Security';
import Coupons from './Coupons';
import Rules from './Rules';

const SettingsActiveItem = ({ activeNavItem }) => {
   const { control, handleSubmit, reset } = useForm();
   const { user } = useAuth();
   const { updateUser } = useUpdateUser();

   const handleSave = data => {
      let correctData = {};
      for (const key in data) {
         if (data[key] !== undefined) {
            correctData[key] = data[key];
         }
      }

      updateUser({ ...user, ...correctData });
      reset();
   };

   if (activeNavItem === 'Personal Details') {
      return <PersonalDetails control={control} handleSave={handleSave} handleSubmit={handleSubmit} />;
   } else if (activeNavItem === 'Security') {
      return <Security control={control} handleSave={handleSave} handleSubmit={handleSubmit} userType={user.type} />;
   } else if (activeNavItem === 'User Points') {
      // TODO USER POINTS
   } else if (activeNavItem === 'Coupons') {
      return <Coupons style={{ justifyContent: 'flex-start' }} />;
   } else if (activeNavItem === 'Rules') {
      return <Rules />;
   }
};

SettingsActiveItem.propTypes = {
   activeNavItem: PropTypes.string,
};

export default SettingsActiveItem;
