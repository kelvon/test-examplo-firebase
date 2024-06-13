import {User} from 'firebase/auth';
import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth não implementado');
  }
  return context;
}

const UserProvider = (props: {children: ReactNode}): ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>('');
  return (
    <UserContext.Provider {...props} value={{user, setUser, token, setToken}} />
  );
};

export {UserProvider, useUserContext};
