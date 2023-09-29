// export const BASE_URL = 'http://192.168.0.33:8000/api/v1/';
export const BASE_URL = 'http://localhost:8000/api/v1/';

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
