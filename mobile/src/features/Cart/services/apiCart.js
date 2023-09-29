import { BASE_URL, OPTIONS } from '../../../helpers/config';

export const getCart = async id => {
   const response = await fetch(BASE_URL + `cart/${id}`, OPTIONS('GET'));
   const responseData = await response.json();

   return responseData;
};

export const createCart = async mutationData => {
   try {
      const response = await fetch(BASE_URL + 'cart', OPTIONS('POST', mutationData));
      const responseData = await response.json();

      return responseData;
   } catch (err) {
      console.error('createCartFn error:', err);
      throw err;
   }
};

export const updateCart = async mutationData => {
   console.log(mutationData);
   const { cartId, items } = mutationData;
   try {
      const response = await fetch(BASE_URL + `cart/${cartId}`, OPTIONS('PATCH', items));
      const responseData = await response.json();

      return responseData;
   } catch (err) {
      console.log(err);
   }
};
