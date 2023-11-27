import { BASE_URL, OPTIONS } from '../../../helpers/config';

export const getAllAds = async () => {
   const response = await fetch(BASE_URL + `ad`, OPTIONS('GET'));
   const responseData = await response.json();

   return responseData;
};
