import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

export default function Settings() {
   return (
      <div className='settings'>
         <Navigation />
         <Outlet />
      </div>
   );
}
