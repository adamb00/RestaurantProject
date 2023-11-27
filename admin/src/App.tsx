import './styles/main.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import SignIn from './features/Auth/SignIn';
import Reservation from './features/Reservations/Reservation';
import Order from './features/Orders/Order';
import Dashboard from './features/Dashboard/Dashboard';
import Settings from './features/Settings/Settings';
import CreateUser from './features/User/CreateUser';
import Home from './features/Home/Home';
import { useAuth } from './contexts/AuthContext';
import CreateFood from './features/Foods/CreateFood';
import EditFood from './features/Foods/EditFood';
import ShowOrder from './features/Orders/ShowOrder';
import UploadAds from './features/Settings/UploadAds';

const PrivateRoute = () => {
   const { isAuthenticated } = useAuth();

   if (!isAuthenticated) return <SignIn />;

   return <Home />;
};

const router = createBrowserRouter([
   {
      element: <AppLayout />,
      children: [
         {
            path: '/',
            element: <PrivateRoute />,
            children: [
               {
                  path: 'reservations',
                  element: <Reservation />,
               },
               {
                  path: 'orders',
                  element: <Order />,
               },
               {
                  path: `orders/show-order/:id`,
                  element: <ShowOrder />,
               },
               {
                  path: 'dashboard',
                  element: <Dashboard />,
               },
               {
                  path: 'settings',
                  element: <Settings />,
                  children: [
                     {
                        path: '',
                        element: <CreateFood />,
                     },
                     {
                        path: 'create-food',
                        element: <CreateFood />,
                     },
                     {
                        path: 'edit-food',
                        element: <EditFood />,
                     },
                     {
                        path: 'create-user',
                        element: <CreateUser />,
                     },
                     {
                        path: 'upload-ad',
                        element: <UploadAds />,
                     },
                  ],
               },
            ],
         },
      ],
   },
]);

export default function App() {
   return <RouterProvider router={router} />;
}
