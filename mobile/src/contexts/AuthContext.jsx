import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();
// const fakeUser = {
//    user: {
//       _id: '64d8b162433d4eb145b28612',
//       fullName: 'Borsodi Adam',
//       email: 'borsodi.dm@gmail.com',
//       phone: 36302387981,
//       createdAt: '2023-08-13T10:17:28.831Z',
//       __v: 0,
//    },
//    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDhiMTYyNDMzZDRlYjE0NWIyODYxMiIsImlhdCI6MTY5MjE2MzIyOSwiZXhwIjoxNjkyMTY4NjI5fQ.w8wrqt02oNG2SOEOv4MXlJxYLpBvet80CMuTJouaDh4',
//    isAuthenticated: true,
// };
const initalState = { user: '', token: '' };

const reducer = (state, action) => {
   switch (action.type) {
      case 'signin':
         return { user: action.payload.data, token: action.payload.token, isAuthenticated: true };
      case 'signout':
         return { ...state, user: null, token: '', isAuthenticated: false };
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

   return (
      <AuthContext.Provider value={{ user, isAuthenticated, token, signin, signout }}>{children}</AuthContext.Provider>
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
