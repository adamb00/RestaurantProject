import SignOut from '../features/Auth/SignOut';
import LinkButton from './LinkButton';
import {
   IoBookOutline,
   IoBook,
   IoPizzaOutline,
   IoPizza,
   IoAnalyticsOutline,
   IoAnalytics,
   IoSettingsOutline,
   IoSettings,
   IoPersonOutline,
   IoPerson,
} from 'react-icons/io5';
import { SiOpenai } from 'react-icons/si';
import { IconContext } from 'react-icons';
import Button from './Button';
import { Dispatch, SetStateAction } from 'react';
interface CustomLinkProps {
   isOpen: boolean;
   to: string;
   icon: React.ReactNode;
   activeIcon: React.ReactNode;
   name: string;
}

const Link = ({ isOpen, to, icon, activeIcon, name }: CustomLinkProps) => {
   return (
      <>
         {isOpen ? (
            <LinkButton to={to} icon={icon} activeIcon={activeIcon}>
               {name}
            </LinkButton>
         ) : (
            <LinkButton to={to} icon={icon} activeIcon={activeIcon}></LinkButton>
         )}
      </>
   );
};

interface MenuProps {
   setIsOpen: Dispatch<SetStateAction<boolean>>;
   isOpen: boolean;
}

export default function Menu({ isOpen, setIsOpen }: MenuProps) {
   return (
      <nav className={`nav ${isOpen ? '' : 'hide-menu'}`}>
         <ul className='nav__list'>
            <IconContext.Provider value={{ className: 'nav__icon' }}>
               <Link
                  isOpen={isOpen}
                  to='/reservations'
                  icon={<IoBookOutline />}
                  activeIcon={<IoBook />}
                  name='Reservations'
               />
               <Link isOpen={isOpen} to='/orders' icon={<IoPizzaOutline />} activeIcon={<IoPizza />} name='Orders' />
               <Link
                  isOpen={isOpen}
                  to='/dashboard'
                  icon={<IoAnalyticsOutline />}
                  activeIcon={<IoAnalytics />}
                  name='Analitics'
               />
               <Link
                  isOpen={isOpen}
                  to='/settings'
                  icon={<IoSettingsOutline />}
                  activeIcon={<IoSettings />}
                  name='Settings'
               />
               <Link
                  isOpen={isOpen}
                  to='/create-user'
                  icon={<IoPersonOutline />}
                  activeIcon={<IoPerson />}
                  name='Account'
               />
            </IconContext.Provider>
         </ul>
         <Button className='open-menu' onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}>
            <SiOpenai className='open-menu__icon' />
         </Button>
         <SignOut />
      </nav>
   );
}
