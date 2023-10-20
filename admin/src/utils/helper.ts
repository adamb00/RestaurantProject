export const BASE_URL = 'http://192.168.0.33:8000/api/v1/';
// export const BASE_URL = 'http://localhost:8000/api/v1/';

export const OPTIONS = (method: string, data?: object) => {
   return {
      method,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
   };
};

export const IS_VALID_EMAIL = (v: string) =>
   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email address must be a valid address';

export const IS_VALID_NUMBER = (v: string) => /^[0-9]+$/.test(v) || 'Value must be a valid number';

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
