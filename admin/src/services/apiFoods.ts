import { FieldValues } from 'react-hook-form';
import { ITEM_PER_PAGE } from '../utils/constants';
import { BASE_URL, OPTIONS, formatToFormData } from '../utils/helper';

export const getFoods = async ({ page = 1 }) => {
   const response = await fetch(BASE_URL + `foods?page=${page}&limit=${ITEM_PER_PAGE}`, OPTIONS('GET'));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   const { totalItems, doc: res } = responseData;

   return { totalItems, res };
};
export const updateFood = async (data: FieldValues, id: string) => {
   const formData = formatToFormData(data);

   const response = await fetch(BASE_URL + `foods/${id}`, OPTIONS('PATCH', formData, 'multipart/form-data'));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};

export const createFood = async (data: FieldValues) => {
   const formData = formatToFormData(data);

   console.log(Object.fromEntries(formData));

   const response = await fetch(BASE_URL + 'foods', OPTIONS('POST', formData, 'multipart/form-data'));
   const responseData = await response.json();

   console.log(responseData);

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};

export const getTypes = async () => {
   const response = await fetch(BASE_URL + 'foods/types', OPTIONS('GET'));
   const responseData = await response.json();

   return responseData;
};
