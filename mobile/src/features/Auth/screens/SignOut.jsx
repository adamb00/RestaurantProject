import React from 'react';

import { useLogoutUser } from '../hooks/useUserAuth';
import { style } from '../../../styles/style';
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';

const SignOut = () => {
   const { singoutUser } = useLogoutUser();
   const handleSubmit = () => {
      try {
         singoutUser();
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <Button handleSubmit={handleSubmit} circle={true} colors={[style['color-white'], style['color-white']]}>
         <Icon name='log-out-outline' form={false} />
      </Button>
   );
};

export default SignOut;
