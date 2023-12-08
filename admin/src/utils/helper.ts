import { FieldValues } from 'react-hook-form';

export const BASE_URL = 'http://192.168.0.33:8000/api/v1/';
// export const BASE_URL = 'http://localhost:8000/api/v1/';

export const OPTIONS = (method: string, data?: FormData | string | object, header: string = 'application/json') => {
   let headers: Record<string, string> = { 'Content-Type': header };
   let body: BodyInit | null | undefined;

   if (header === 'multipart/form-data') {
      headers = {};
      body = data as FormData;
   } else if (header === 'application/json' && typeof data === 'object') {
      body = JSON.stringify(data);
   } else {
      body = data as string;
   }

   return {
      method,
      withCredentials: true,
      headers,
      body,
   };
};

export const IS_VALID_EMAIL = (v: string) =>
   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email address must be a valid address';

export const IS_VALID_NUMBER = (v: string) => {
   if (v === '') {
      return true;
   }
   return /^[0-9]+$/.test(v) || 'Value must be a valid number';
};

export function formatDate(dateStr: string) {
   return new Intl.DateTimeFormat('hu', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   }).format(new Date(dateStr));
}

export const getOrdinalSuffix = (number: number) => {
   const lastDigit = number % 10;
   const lastTwoDigits = number % 100;

   if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return `${number}th`;
   }

   switch (lastDigit) {
      case 1:
         return `${number}st`;
      case 2:
         return `${number}nd`;
      case 3:
         return `${number}rd`;
      default:
         return `${number}th`;
   }
};

export const formatPhoneNumber = (phoneNumber: string) => {
   const cleaned = phoneNumber.replace(/\D/g, '');

   if (cleaned.length >= 9) {
      if (cleaned.startsWith('36')) {
         return `( +36 ${cleaned.slice(2, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 11)} )`;
      } else {
         return `( +36 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)} )`;
      }
   } else {
      return phoneNumber;
   }
};

export const formatCurrency = (currency: number) => {
   return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0,
   }).format(currency);
};

export const formatToFormData = (data: FieldValues) => {
   const formData: FormData = new FormData();

   for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
         const value = data[key];

         if (key === 'image') {
            formData.append('image', value);
         } else if (key === 'price' && Array.isArray(value) && value.length > 0) {
            formData.append('price', JSON.stringify(value));
         } else if (value) {
            formData.append(key, value);
         }
      }
   }

   return formData;
};
