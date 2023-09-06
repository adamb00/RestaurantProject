import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { header_primary, header_secondary, style } from '../../../styles/style';
import Button from '../../../components/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { useSendCallRequest } from '../hooks/useReservation';

const CallBack = () => {
   const { user } = useAuth();
   const { sendCallRequest, isSending } = useSendCallRequest();
   const onButtonClicked = () => {
      sendCallRequest({ ...user });
   };
   return (
      <SafeAreaView style={{ marginVertical: 100 }}>
         <Text style={header_primary}>Or just need a call?</Text>
         <Text style={header_secondary}>Please hit the button below</Text>
         <Button
            onLoading={isSending}
            handleSubmit={onButtonClicked}
            colors={[style['color-primary-tint'], style['color-primary']]}
         >
            Call me now!
         </Button>
      </SafeAreaView>
   );
};

export default CallBack;
