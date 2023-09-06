import { BASE_URL, OPTIONS } from '../../../helpers/config';

export const sendReservation = async reservation => {
   const response = await fetch(BASE_URL + 'reservations/sendReservation', OPTIONS('POST', reservation));
   const responseData = await response.json();

   return responseData;
};

export const callBack = async data => {
   const response = await fetch(BASE_URL + 'reservations/sendMail', OPTIONS('POST', data));
   const responseData = await response.json();
   return responseData;
};
