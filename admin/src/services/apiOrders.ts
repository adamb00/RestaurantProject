import { ITEM_PER_PAGE } from '../utils/constants';
import { BASE_URL, OPTIONS } from '../utils/helper';

export const getOrders = async ({ page = 1 }) => {
   const response = await fetch(BASE_URL + `orders?page=${page}&limit=${ITEM_PER_PAGE}`, OPTIONS('GET'));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   const { totalItems, doc: res } = responseData;

   return { totalItems, res };
};

export const getOneOrder = async (id: string) => {
   const response = await fetch(BASE_URL + `orders/${id}`, OPTIONS('GET'));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};

export const updateOrder = async (id: string, data: object) => {
   const response = await fetch(BASE_URL + `orders/${id}`, OPTIONS('PATCH', data));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};
