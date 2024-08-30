import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';

const Stack = createNativeStackNavigator()


const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "508173442327-kb1av3p6bb3rg9fplkrdd6676b1vv160.apps.googleusercontent.com"
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false,
        // headerTitle: ' ',
        // headerStyle: { backgroundColor: '#e59479' },
        // headerShadowVisible: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App