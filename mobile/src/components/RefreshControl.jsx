import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';

const RefreshControl = ({ children }) => {
   const [refreshing, setRefreshing] = useState(false);

   const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
         setRefreshing(false);
      }, 1000);
   }, []);
   return (
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
         {children}
      </ScrollView>
   );
};

RefreshControl.propTypes = {
   children: PropTypes.node,
};
export default RefreshControl;
