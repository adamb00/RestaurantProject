import { useEffect } from 'react';
import { setCart, setCartId } from '../../Cart/reducers/cartReducer';
import { useDispatch } from 'react-redux';
import { useGetAllCart } from '../../Cart/hooks/useCart';
import { useAuth } from '../../../contexts/AuthContext';

export const useGetCurrentUserCart = () => {
   const dispatch = useDispatch();
   const { carts } = useGetAllCart();
   const { user } = useAuth();

   let currentUserCart;
   useEffect(() => {
      if (carts && carts.doc) {
         currentUserCart = carts.doc.find(cart => cart.user === user._id) ?? [];
      }
      if (currentUserCart) {
         dispatch(setCartId(currentUserCart._id));
         dispatch(setCart(currentUserCart.items));
      }
   }, [carts, user, dispatch]);

   return { carts, user };
};
