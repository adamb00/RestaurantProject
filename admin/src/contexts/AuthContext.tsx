import { PropsWithChildren, createContext, useReducer, useContext, Dispatch } from 'react';

interface UserData {
   _id: string;
   email: string;
   password: string;
   fullName: string;
   phone: number;
   createdAt: Date;
}

interface AppState {
   user: UserData | '';
   token: string;
   isAuthenticated: boolean;
}

interface SigninAction {
   type: 'signin';
   payload: {
      data: UserData;
      token: string;
   };
}

interface SignoutAction {
   type: 'signout';
}

type AuthAction = SigninAction | SignoutAction;

const initialState: AppState = { user: '', token: '', isAuthenticated: false };

interface AuthContextValue {
   user: UserData | '';
   isAuthenticated: boolean;
   token: string;
   dispatch: Dispatch<AuthAction>;
   signin: (data: { data: UserData; token: string }) => void;
   signout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const reducer = (state: AppState, action: AuthAction): AppState => {
   switch (action.type) {
      case 'signin':
         return { user: action.payload.data, token: action.payload.token, isAuthenticated: true };
      case 'signout':
         return { ...state, user: '', token: '', isAuthenticated: false };
      default:
         throw new Error('Unknown action');
   }
};

const AuthProvider = ({ children }: PropsWithChildren) => {
   const [{ user, isAuthenticated, token }, dispatch] = useReducer(reducer, initialState);

   const signin = (data: { data: UserData; token: string }) => {
      dispatch({ type: 'signin', payload: data });
      console.log('USER STORED IN THE CONTEXT');
      console.log(data);
   };

   const signout = () => {
      dispatch({ type: 'signout' });
      console.log('successfully signed out');
   };

   const contextValue: AuthContextValue = {
      user,
      isAuthenticated,
      token,
      dispatch,
      signin,
      signout,
   };

   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) throw new Error('AuthContext was used outside AuthProvider');
   return context;
};

export { AuthProvider, AuthContext };
