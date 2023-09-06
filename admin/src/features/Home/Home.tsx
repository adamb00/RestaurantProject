import { Outlet } from 'react-router-dom';
import Menu from '../../ui/Menu';
import Navbar from '../../ui/Navbar';
import { useState } from 'react';

export default function Home() {
   const [isOpen, setIsOpen] = useState<boolean>(true);

   return (
      <div className={`home ${isOpen ? '' : 'home__closed'}`}>
         <Navbar />
         <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
         <Outlet />
      </div>
   );
}
