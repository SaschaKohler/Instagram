import {getCurrentUser} from 'aws-amplify/auth';
import {Hub} from 'aws-amplify/utils';
import {ReactNode, createContext, useContext, useEffect, useState} from 'react';

type CurrentUser = {
  username: string;
  userId: string;
  signInDetails?: {};
};
type UserType = CurrentUser | undefined | null;

type AuthContextType = {
  user: UserType;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserType>();

  const checkUser = async () => {
    try {
      const result = await getCurrentUser();
      console.log('authContext.tsx: ', result);

      setUser(result);
    } catch (e) {
      setUser(null);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    Hub.listen('auth', data => {
      console.log(data);
      const {event} = data.payload;
      if (event === 'signedOut') setUser(null);
      if (event === 'signedIn') checkUser();
    });
  }, []);

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
