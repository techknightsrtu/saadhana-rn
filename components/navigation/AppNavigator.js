import { createStackNavigator } from "@react-navigation/stack"
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Login from "../screens/Login";
import KKB from '../screens/KKB';
import Kirtan from '../screens/Kirtan';
import Katha from '../screens/Katha';
import Books from '../screens/Books';
 

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
          headerShadowVisible:false,
          headerTitle:''

      }} name="Books" component={Books} />

        </Stack.Navigator>
)

export default AppNavigator