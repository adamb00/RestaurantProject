import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { Toaster } from 'react-hot-toast';

import App from './App.tsx';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: { staleTime: 1 * 60 * 1000 },
   },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools initialIsOpen={false} />
         <AuthProvider>
            <App />
            <Toaster
               position='top-center'
               toastOptions={{
                  className: 'toaster',
                  success: {
                     duration: 3000,
                  },
                  error: {
                     duration: 5000,
                  },
               }}
            />
         </AuthProvider>
      </QueryClientProvider>
   </React.StrictMode>
);
