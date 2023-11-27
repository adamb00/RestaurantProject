// export const BASE_URL = 'http://localhost:8000/api/v1/';
export const BASE_URL = 'http://192.168.0.33:8000/api/v1/';

export const ZOOM_LEVEL = 0.001;

export const DELIVERY_PRICE = 850;
export const WRAPPING_PRICE = 250;

export const OPTIONS = (method, data) => {
   return {
      method,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
   };
};

export const truncateText = (text, maxLength) => {
   if (text.length > maxLength) {
      const commaIndex = text.lastIndexOf(',', maxLength - 3);
      if (commaIndex !== -1) {
         return text.substring(0, commaIndex) + '...';
      }
      return text.substring(0, maxLength - 3) + '...';
   }
   return text;
};

export const formatCurrency = currency => {
   return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: 'HUF',
      maximumFractionDigits: 0,
   }).format(currency);
};

export const glutenFree = food => {
   if (food.glutenFree) {
      return 'There is no gluten in this food.';
   } else if (!food.glutenFree && food.canMakeGlutenFree) {
      return 'To get this food gluten-free, please ask for it while ordering.';
   } else if (!food.glutenFree && !food.canMakeGlutenFree) {
      return 'Sorry, but unfortunately, there is no way to make this food gluten-free.';
   }

   return 'Information about gluten availability not found for this food.';
};

export const lactoseFree = food => {
   if (food.lactoseFree) {
      return 'There is no lactose in this food.';
   } else if (!food.lactoseFree && food.canMakeLactoseFree) {
      return 'To get this food lactose-free, please ask for it while ordering.';
   } else if (!food.lactoseFree && !food.canMakeLactoseFree) {
      return 'Sorry, but unfortunately, there is no way to make this food lactose-free.';
   }

   return 'Information about lactose availability not found for this food.';
};

export const getOrdinalSuffix = number => {
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

export const filterExpiredCoupons = coupons => {
   const currentTimestamp = Date.now();
   return coupons.filter(coupon => coupon.expires > currentTimestamp);
};

export function formatDate(dateStr) {
   return new Intl.DateTimeFormat('hu', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
   }).format(new Date(dateStr));
}
