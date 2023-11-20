import { BASE_URL, OPTIONS } from '../../../helpers/config';

export const getFoods = async () => {
   const response = await fetch(BASE_URL + `foods`, OPTIONS('GET'));

   const responseData = await response.json();

   return responseData;
};

export const getOneFood = async id => {
   try {
      const response = await fetch(BASE_URL + `foods/${id}`, OPTIONS('GET'));
      if (!response.ok) {
         throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const responseData = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
   }
};

export const getTypes = async () => {
   const response = await fetch(BASE_URL + 'foods/types', OPTIONS('GET'));
   const responseData = await response.json();

   return responseData;
};

export const getReviewsOnFood = async id => {
   const response = await fetch(BASE_URL + `foods/${id}/reviews`, OPTIONS('GET'));
   const responseData = await response.json();

   if (responseData.doc.length === 0) return 'Currently there is no review on this food.';
   return responseData.doc;
};

export const createReviewOnFood = async mutationData => {
   const { id, data } = mutationData;
   const response = await fetch(BASE_URL + `foods/${id}/reviews`, OPTIONS('POST', data));
   const responseData = await response.json();

   return responseData;
};

export const getTopFavoriteFoods = async () => {
   const response = await fetch(BASE_URL + `foods/top-fav`, OPTIONS('GET'));

   const responseData = await response.json();

   return responseData;
};
