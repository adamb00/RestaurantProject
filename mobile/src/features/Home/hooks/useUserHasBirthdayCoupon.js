import { useEffect, useState } from 'react';

export const useUserHasBirthdayCoupon = user => {
   const [userAlreadyGetBirthdayCoupon, setUserAlreadyGetBirthdayCoupon] = useState(false);

   useEffect(() => {
      const userAlreadyGetBirthdayCoupon = user.coupons.find(item => item.name === 'Happy Birthday');
      setUserAlreadyGetBirthdayCoupon(userAlreadyGetBirthdayCoupon);
   }, [user]);

   return { userAlreadyGetBirthdayCoupon, setUserAlreadyGetBirthdayCoupon };
};
