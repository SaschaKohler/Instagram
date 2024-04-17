import {Amplify} from 'aws-amplify';
import {
  withAuthenticator,
  useAuthenticator,
  Authenticator,
} from '@aws-amplify/ui-react-native';
import config from './src/aws-exports';
import Navigation from './src/navigation';
import AuthContextProvider from './src/contexts/AuthContext';

Amplify.configure(config);

const App = () => {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
};

export default App;
