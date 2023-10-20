import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const initalState = { user: '', token: '' };

const reducer = (state, action) => {
   switch (action.type) {
      case 'signin':
         return { user: action.payload.data, token: action.payload.token, isAuthenticated: true };
      case 'signout':
         return { ...state, user: null, token: '', isAuthenticated: false };
      case 'updateUser':
         return { ...state, user: action.payload };
      default:
         throw new Error('Unkown action');
   }
};

const AuthProvider = ({ children }) => {
   const [{ user, isAuthenticated, token }, dispatch] = useReducer(reducer, initalState);

   const signin = data => {
      dispatch({ type: 'signin', payload: data });
      console.log('USER STORED IN THE CONTEXT');
   };

   const signout = () => {
      dispatch({ type: 'signout' });
      console.log('successfully signed out');
   };
   const updateUser = updatedUserData => {
      dispatch({ type: 'updateUser', payload: updatedUserData });
      console.log('User data updated in the context');
   };

   return (
      <AuthContext.Provider value={{ user, isAuthenticated, token, signin, signout, updateUser }}>
         {children}
      </AuthContext.Provider>
   );
};

AuthProvider.propTypes = {
   children: PropTypes.object,
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) throw new Error('AuthContext was use outside AuthProvider');
   return context;
};
export { AuthContext, AuthProvider };
