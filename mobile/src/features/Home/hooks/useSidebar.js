import { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';

export const useSidebar = () => {
   const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

   const sidebarPosition = new Animated.Value(-250);

   const handleOnPress = () => {
      const toValue = sidebarIsOpen ? -250 : 0;
      Animated.timing(sidebarPosition, {
         toValue,
         duration: 300,
         easing: Easing.linear,
         useNativeDriver: false,
      }).start();

      setSidebarIsOpen(!sidebarIsOpen);
   };

   useEffect(() => {
      const toValue = sidebarIsOpen ? 0 : -250;
      Animated.timing(sidebarPosition, {
         toValue,
         duration: 300,
         easing: Easing.linear,
         useNativeDriver: false,
      }).start();
   }, [sidebarIsOpen]);

   return { handleOnPress, sidebarIsOpen, sidebarPosition, setSidebarIsOpen };
};
