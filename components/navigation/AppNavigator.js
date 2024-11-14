import { createStackNavigator } from "@react-navigation/stack"
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Login from "../screens/Login";

 

const Stack=createStackNavigator()

const AppNavigator=()=>(
    <Stack.Navigator >
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

        </Stack.Navigator>
)

export default AppNavigator