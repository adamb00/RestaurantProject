import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

interface LinkButtonProps {
   to: string;
   icon?: React.ReactNode;
   activeIcon?: React.ReactNode;
}

export default function LinkButton({ children, to, icon, activeIcon }: PropsWithChildren<LinkButtonProps>) {
   return (
      <NavLink
         className={({ isActive, isPending }) =>
            isPending ? 'nav__link nav__link--pending' : isActive ? 'nav__link nav__link--active' : 'nav__link'
         }
         to={to}
      >
         {({ isActive }) =>
            isActive ? (
               <div className='nav__item'>
                  {activeIcon}
                  {children}
               </div>
            ) : (
               <div className='nav__item'>
                  {icon}
                  {children}
               </div>
            )
         }
      </NavLink>
   );
}
