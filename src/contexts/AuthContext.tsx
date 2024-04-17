import {AuthUser, GetCurrentUserOutput, getCurrentUser} from 'aws-amplify/auth';
import {Hub} from 'aws-amplify/utils';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type CurrentUser = {
  username: string;
  userId: string;
  signInDetails?: {};
};
type UserType = CurrentUser | undefined | null;

type AuthContextType = {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  setUser: () => {},
});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const result = await getCurrentUser();
        console.log('authContext.tsx: ', result);

        setUser(result);
      } catch (e) {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    const hubListenerSignedOut = Hub.listen('auth', data => {
      console.log(data);
      const {event} = data.payload;
      if (event === 'signedOut') setUser(null);
    });
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
