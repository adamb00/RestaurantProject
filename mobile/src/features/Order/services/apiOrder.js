import { BASE_URL, OPTIONS } from '../../../helpers/config';

export const getAllOrder = async () => {
   const response = await fetch(BASE_URL + `order`, OPTIONS('GET'));
   const responseData = await response.json();

   return responseData;
};

export const createOrder = async data => {
   try {
      const response = await fetch(BASE_URL + 'orders', OPTIONS('POST', data));
      const responseData = await response.json();

      return responseData;
   } catch (err) {
      console.error(err);
   }
};
