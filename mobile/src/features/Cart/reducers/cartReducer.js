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
      increaseCartExtras(state, action) {
         let { topping, currentFood } = action.payload;

         let current = state.cart.find(item => item.food._id === currentFood.food._id);
         if (!current.extras) current.extras = [];

         const existingExtra = current.extras.find(item => item.topping._id === topping._id);

         if (!existingExtra) {
            current.extras.push({ topping, quantity: 1 });
         } else {
            existingExtra.quantity += 1;
         }
      },
      decreaseCartExtras(state, action) {
         let { topping, currentFood } = action.payload;

         console.log(currentFood);

         let current = state.cart.find(item => item.food._id === currentFood.food._id);
         if (!current.extras) current.extras = [];

         console.log(current);

         const existingExtra = current.extras.find(item => item.topping._id === topping._id);

         if (!existingExtra) {
            return;
         } else {
            if (existingExtra.quantity > 0) {
               existingExtra.quantity -= 1;
            }
            if (existingExtra.quantity === 0) {
               current.extras = current.extras.filter(extra => extra.quantity > 0);
            }
         }
      },
      setCartId(state, action) {
         state.cartId = action.payload;
      },
      additem(state, action) {
         const newItem = action.payload;
         const existingItem = state?.cart?.find(item => item.food._id === newItem._id);

         if (existingItem) {
            existingItem.quantity += 1;
         } else {
            state.cart = state.cart === undefined ? [] : [...state.cart];
            state.cart.push({ food: newItem, quantity: 1 });
         }
      },
      deleteItem(state, action) {
         state.cart = state.cart.filter(item => item.food._id !== action.payload._id);
      },
      increase(state, action) {
         const item = state.cart.find(item => item.food._id === action.payload._id);
         item.quantity++;
         item.totalPrice = action.payload.price * item.quantity;
      },
      decrease(state, action) {
         const item = state.cart.find(item => item.food._id === action.payload._id);
         item.quantity--;
         item.totalPrice = action.payload.price * item.quantity;
         if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
      },
      clear(state) {
         state.cart = [];
      },
   },
});

export const {
   setCart,
   increaseCartExtras,
   decreaseCartExtras,
   setCartId,
   additem,
   deleteItem,
   increase,
   decrease,
   clear,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = state => state?.cart?.cart ?? [];

export const getCurrentQuantity = id => state => {
   const cartArray = Array.isArray(state.cart.cart) ? state.cart.cart : [];
   const cartItem = cartArray.find(item => item.food._id === id);
   return cartItem ? cartItem.quantity : 0;
};

export const getTotalItemsQuantity = state => {
   const cartArray = state?.cart?.cart ?? [];
   return cartArray.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
};

export const getCartId = state => state?.cart?.cartId ?? '';

export const getExtrasTotalPrice = state => {
   const extrasPrice = state.cart.cart.reduce((sum, item) => {
      if (!item.extras) return 0;

      const itemExtrasPrice = item?.extras?.reduce(
         (itemSum, extra) => itemSum + extra.quantity * extra.topping.price,
         0
      );
      return sum + itemExtrasPrice;
   }, 0);

   return extrasPrice;
};

export const getFoodsTotalPrice = state =>
   state?.cart?.cart?.reduce((sum, item) => sum + item.food.price * item.quantity, 0);

export const getTotalCartPrice = state => {
   const totalPrice = state?.cart?.cart?.reduce((sum, item) => sum + item.food.price * item.quantity, 0);

   const extrasPrice = state.cart.cart.reduce((sum, item) => {
      if (!item.extras) return 0;

      const itemExtrasPrice = item?.extras?.reduce(
         (itemSum, extra) => itemSum + extra.quantity * extra.topping.price,
         0
      );
      return sum + itemExtrasPrice;
   }, 0);

   return totalPrice + extrasPrice;
};

export const getTotalItemPrice = id => state => {
   let totalPrice = 0;
   state.cart.cart.find(item => {
      if (item.food._id === id) totalPrice = item.food.price * item.quantity;
   });
   return totalPrice;
};
