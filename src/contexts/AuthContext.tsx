import {CognitoUser} from 'amazon-cognito-identity-js';
import {ReactNode, createContext, useContext} from 'react';

const AuthContext = createContext({user: undefined, setUser: () => {}});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<CognitoUser | null | undefined>(undefined);
  return <AuthContext.Provider value={}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
