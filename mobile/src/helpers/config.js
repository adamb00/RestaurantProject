export const BASE_URL = 'http://localhost:8000/api/v1/';
// export const BASE_URL = 'http://192.168.0.33:8000/api/v1/';

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
      return 'Sorry, but unfortunately, there is no way to make this gluten-free.';
   }

   return 'Information about gluten availability not found for this food.';
};

export const lactoseFree = food => {
   if (food.lactoseFree) {
      return 'There is no lactose in this food.';
   } else if (!food.lactoseFree && food.canMakeLactoseFree) {
      return 'To get this food lactose-free, please ask for it while ordering.';
   } else if (!food.lactoseFree && !food.canMakeLactoseFree) {
      return 'Sorry, but unfortunately, there is no way to make this lactose-free.';
   }

   return 'Information about lactose availability not found for this food.';
};
