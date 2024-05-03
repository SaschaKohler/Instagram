import {Amplify} from 'aws-amplify';
import config from './src/aws-exports';
import Navigation from './src/navigation';
import Client from './src/apollo/Client';
import AuthContextProvider from './src/contexts/AuthContext';
import {MenuProvider} from 'react-native-popup-menu';

Amplify.configure(config);

const App = () => {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <Client>
          <Navigation />
        </Client>
      </AuthContextProvider>
    </MenuProvider>
  );
};

export default App;
