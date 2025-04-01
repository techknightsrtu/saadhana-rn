import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import AppNavigator from './components/navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './components/app/store';

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