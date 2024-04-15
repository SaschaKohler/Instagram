import {Amplify} from 'aws-amplify';
import {
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react-native';
import config from './src/aws-exports';
import Navigation from './src/navigation';

Amplify.configure(config);

const App = () => {
  return <Navigation />;
};

export default App;
