import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   cart: [],
   cartId: '',
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      setCart(state, action) {
         state.cart = action.payload;
      },
      setCartId(state, action) {
         state.cartId = action.payload;
      },
      additem(state, action) {
         const newItem = action.payload;
         const existingItem = state.cart?.find(item => item.food === newItem);

         if (existingItem) {
            existingItem.quantity += 1;
         } else {
            state.cart?.push({ food: newItem, quantity: 1 });
         }
      },
      deleteItem(state, action) {
         state.cart = state.cart.filter(item => item.food !== action.payload);
      },
      increase(state, action) {
         const item = state.cart.find(item => item.food === action.payload);
         item.quantity++;
      },
      decrease(state, action) {
         const item = state.cart.find(item => item.food === action.payload);
         item.quantity--;
         if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
      },
      clear(state) {
         state.cart = [];
      },
   },
});

export const { setCart, setCartId, additem, deleteItem, increase, decrease, clear } = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = state => state.cart.cart;

export const getCurrentQuantity = id => state => {
   if (!state.cart.cart) {
      return 0;
   } else return state?.cart?.cart?.find(item => item.food === id)?.quantity;
};

export const getCartId = state => state?.cart?.cartId ?? '';
