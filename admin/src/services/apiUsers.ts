import { BASE_URL, OPTIONS } from '../utils/helper';

export const loginUser = async (user: object) => {
   console.log(user);
   const response = await fetch(BASE_URL + 'admin/signin', OPTIONS('POST', user));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};

export const logoutUser = async () => {
   const response = await fetch(BASE_URL + 'admin/signout', OPTIONS('POST'));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};

export const getOneUser = async (id: string) => {
   const response = await fetch(BASE_URL + `users/${id}`, OPTIONS('GET'));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};
