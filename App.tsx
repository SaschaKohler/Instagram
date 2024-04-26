import {Amplify} from 'aws-amplify';
// import config from './src/amplifyconfiguration.json';
import config from './src/aws-exports';
import Navigation from './src/navigation';
import Client from './src/apollo/Client';
import AuthContextProvider from './src/contexts/AuthContext';

Amplify.configure(config);

const App = () => {
  return (
    <AuthContextProvider>
      <Client>
        <Navigation />
      </Client>
    </AuthContextProvider>
  );
};

export default App;
