import { ITEM_PER_PAGE } from '../utils/constants';
import { BASE_URL, OPTIONS } from '../utils/helper';

export const getReservations = async ({ page = 1 }) => {
   const response = await fetch(BASE_URL + `reservations?page=${page}&limit=${ITEM_PER_PAGE}`, OPTIONS('GET'));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   const { totalItems, doc: res } = responseData;

   return { totalItems, res };
};
