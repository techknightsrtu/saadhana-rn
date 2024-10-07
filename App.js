import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import { LogBox } from 'react-native';
import Record_saadhana from './components/Record_saadhana';
import KKB from './components/KKB';
import Kirtan from './components/Kirtan';
import Katha from './components/Katha';
import Books from './components/Books';
import Review_saadhana from './components/Review_saadhana';

// LogBox.ignoreAllLogs(); 

const Stack = createNativeStackNavigator()

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "508173442327-kb1av3p6bb3rg9fplkrdd6676b1vv160.apps.googleusercontent.com"
    })
  }, [])

  return (
    <GestureHandlerRootView style={{flex:1,backgroundColor:'white'}}>
    <NavigationContainer initialRouteName="Home">
      <Stack.Navigator 
      // screenOptions={{
      //   headerShown:false,
        // headerTitle: ' ',
        // headerStyle: { backgroundColor: '#e59479' },
        // headerShadowVisible: false
      // }}
      >
        <Stack.Screen options={{headerShown:false,}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown:false,}} name="Home" component={Home} />
        <Stack.Screen options={{
          headerTitle: 'My Profile',
          headerStyle: { backgroundColor: '#e59479' },
          headerTintColor:'white',
          headerShadowVisible: false,
          headerTitleStyle:{fontSize:20},
          headerTitleAlign:'center'
        }} 
        name="Profile" component={Profile} />
        <Stack.Screen options={{
          headerTitle: 'Saadhana Card',
          headerStyle: { backgroundColor: '#e59479' },
          headerTintColor:'white',
          headerShadowVisible: false,
          headerTitleStyle:{fontSize:20},
          headerTitleAlign:'center'
        }} 
        name="Record_saadhana" component={Record_saadhana}/>
        
        <Stack.Screen options={{
          headerStyle:{backgroundColor:'#f1fdf1'},
          headerShadowVisible:false,
          headerTitle:''

      }} name="KKB" component={KKB} />

        <Stack.Screen options={{
          headerStyle:{backgroundColor:'#f1fdf1'},
          headerShadowVisible:false,
          headerTitle:''

      }} name="Kirtan" component={Kirtan} />


        <Stack.Screen options={{
          headerStyle:{backgroundColor:'#f1fdf1'},
          headerShadowVisible:false,
          headerTitle:''

      }} name="Katha" component={Katha} />


        <Stack.Screen options={{
          headerStyle:{backgroundColor:'#f1fdf1'},
          headerTintColor:'white',
          headerShadowVisible:false,
          headerTitle:''

      }} name="Books" component={Books} />


        <Stack.Screen options={{
          headerTitle: 'Saadhana Dashboard',
          headerStyle: { backgroundColor: '#a486de' },
          headerTintColor:'white',
          headerShadowVisible: false,
          headerTitleStyle:{fontSize:20},
          headerTitleAlign:'center'

      }} name="Review_saadhana" component={Review_saadhana} />



      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App