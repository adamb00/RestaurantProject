import { FieldValues } from 'react-hook-form';
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

export const createFood = async (data: FieldValues) => {
   const formData: FormData = new FormData();

   for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
         const value = data[key];

         if (key === 'image') {
            formData.append('image', value);
         } else if (value) {
            formData.append(key, value);
         }
      }
   }

   // const response = await fetch(BASE_URL + 'foods', OPTIONS('POST', data));

   console.log(Object.fromEntries(formData));

   const response = await fetch(BASE_URL + 'foods', OPTIONS('POST', formData, 'multipart/form-data'));
   const responseData = await response.json();

   console.log(response);

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};

export const getTypes = async () => {
   const response = await fetch(BASE_URL + 'foods/types', OPTIONS('GET'));
   const responseData = await response.json();

   return responseData;
};
