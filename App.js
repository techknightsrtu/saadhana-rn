import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import AppNavigator from './components/navigation/AppNavigator';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { Provider } from 'react-redux';
import store from './components/app/store';
import { checkUserAuth } from './components/modules/validations/userAuthExisting';

LogBox.ignoreAllLogs();

const App = ({navigation}) => {
  

  return (
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
          <NavigationContainer initialRouteName="Home">
            <AppNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
        </Provider>
      
  )
}

export default App