import { BASE_URL, OPTIONS } from '../../../helpers/config';

export const getAllCart = async () => {
   const response = await fetch(BASE_URL + `cart`, OPTIONS('GET'));
   const responseData = await response.json();

   return responseData;
};
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
      console.error(err);
   }
};

export const updateCart = async ({ cartId, items }) => {
   try {
      const response = await fetch(BASE_URL + `cart/${cartId}`, OPTIONS('PATCH', items));
      const responseData = await response.json();

      return responseData;
   } catch (err) {
      console.log(err);
   }
};

export const deleteCart = async cartId => {
   console.log(cartId);
   try {
      const response = await fetch(BASE_URL + `cart/${cartId}`, OPTIONS('DELETE'));
      const responseData = await response.json();

      return responseData;
   } catch (err) {
      console.log(err);
   }
};
