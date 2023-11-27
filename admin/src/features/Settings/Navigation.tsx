import { NavLink } from 'react-router-dom';

export default function Navigation() {
   return (
      <nav className='settings-navigation'>
         <ul className='settings-navigation__list'>
            <li className='settings-navigation__link'>
               <NavLink to={'create-food'} className='settings-navigation__item'>
                  Create Food
               </NavLink>
            </li>
            <li className='settings-navigation__link'>
               <NavLink to={'edit-food'} className='settings-navigation__item'>
                  Edit Food
               </NavLink>
            </li>

            <li className='settings-navigation__link'>
               <NavLink to={'create-user'} className='settings-navigation__item'>
                  Create User
               </NavLink>
            </li>
            <li className='settings-navigation__link'>
               <NavLink to={'upload-ad'} className='settings-navigation__item'>
                  Upload Ads
               </NavLink>
            </li>
            <li className='settings-navigation__link'>
               <NavLink to={'/'} className='settings-navigation__item'>
                  Menu Item
               </NavLink>
            </li>
            <li className='settings-navigation__link'>
               <NavLink to={'/'} className='settings-navigation__item'>
                  Menu Item
               </NavLink>
            </li>
         </ul>
      </nav>
   );
}
