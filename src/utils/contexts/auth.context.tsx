import { createContext, useContext } from 'react';
import { User } from 'firebase/auth';

import useAuth from 'utils/hooks/use-auth.hook';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  hasLoaded: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const { user, hasLoaded } = useAuth();
  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, hasLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
