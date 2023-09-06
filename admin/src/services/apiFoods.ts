import { ITEM_PER_PAGE } from '../utils/constants';
import { BASE_URL, OPTIONS } from '../utils/helper';

export const getFoods = async ({ page = 1 }) => {
   const response = await fetch(BASE_URL + `foods?page=${page}&limit=${ITEM_PER_PAGE}`, OPTIONS('GET'));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   const { totalItems, doc: res } = responseData;

   return { totalItems, res };
};
export const updateFood = async (data: object, id: string) => {
   const response = await fetch(BASE_URL + `foods/${id}`, OPTIONS('PATCH', data));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};

export const createFood = async (data: object) => {
   const response = await fetch(BASE_URL + 'foods', OPTIONS('POST', data));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};
