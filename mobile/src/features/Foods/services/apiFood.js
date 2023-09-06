import { BASE_URL, OPTIONS } from '../../../helpers/config';

export const getFoods = async () => {
   const response = await fetch(BASE_URL + 'foods', OPTIONS('GET'));
   const responseData = await response.json();

   return responseData;
};

export const getTypes = async () => {
   const response = await fetch(BASE_URL + 'foods/types', OPTIONS('GET'));
   const responseData = await response.json();

   return responseData;
};
