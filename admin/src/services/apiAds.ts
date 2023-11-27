import { FieldValues } from 'react-hook-form';
import { BASE_URL, OPTIONS, formatToFormData } from '../utils/helper';

export const createAd = async (data: FieldValues) => {
   const formData = formatToFormData(data);

   const response = await fetch(BASE_URL + 'ad', OPTIONS('POST', formData, 'multipart/form-data'));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};
