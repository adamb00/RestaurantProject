import { BASE_URL, OPTIONS } from '../../../helpers/config';

export const createUser = async newUser => {
   const response = await fetch(BASE_URL + 'users/signup', OPTIONS('POST', newUser));
   const responseData = await response.json();

   return responseData;
};

export const loginUser = async user => {
   const response = await fetch(BASE_URL + 'users/signin', OPTIONS('POST', user));
   const responseData = await response.json();

   return responseData;
};

export const logoutUser = async () => {
   const response = await fetch(BASE_URL + 'users/signout', OPTIONS('POST'));
   const responseData = await response.json();

   return responseData;
};

export const updateUser = async user => {
   const response = await fetch(BASE_URL + `users/${user._id}`, OPTIONS('PATCH', user));
   const responseData = await response.json();

   return responseData;
};

export const getCurrentUser = async id => {
   const response = await fetch(BASE_URL + `users/${id}`, OPTIONS('GET'));
   const responseData = await response.json();

   return responseData;
};
