import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import AppNavigator from './components/navigation/AppNavigator';
import {GOOGLE_WEB_CLIENT_ID} from '@env';

LogBox.ignoreAllLogs();  

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      // webClientId: "508173442327-kb1av3p6bb3rg9fplkrdd6676b1vv160.apps.googleusercontent.com"
      webClientId:GOOGLE_WEB_CLIENT_ID
    })
  }, [])


  return (
    <GestureHandlerRootView style={{flex:1,backgroundColor:'white'}}>
    <NavigationContainer  initialRouteName="Home">
        <AppNavigator/>                   
    </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App