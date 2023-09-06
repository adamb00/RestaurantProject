import { IconContext } from 'react-icons';
import { GoSignOut } from 'react-icons/go';
import { useLogoutUser } from './useUserAuth';

export default function SignOut() {
   const { logoutUser } = useLogoutUser();

   return (
      <div onClick={() => logoutUser()}>
         <IconContext.Provider value={{ className: 'nav__icon' }}>
            <GoSignOut />
         </IconContext.Provider>
      </div>
   );
}
