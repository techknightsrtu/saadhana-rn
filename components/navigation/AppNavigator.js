import { createStackNavigator } from "@react-navigation/stack"
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Login from "../screens/Login";
import KKB from '../screens/KKB';
import Kirtan from '../screens/Kirtan';
import Katha from '../screens/Katha';
import Books from '../screens/Books';
import Record_saadhana from '../screens/RecordSaadhana';
import RecordComSaadhana from "../screens/RecordComSaadhana";
import Saadhana_report from "../screens/SaadhanaReport";
import Review_saadhana from '../screens/ReviewSaadhana';

const Stack = createStackNavigator()

const AppNavigator = () => (

  <Stack.Navigator >
    <Stack.Screen options={{ headerShown: false, }} name="Login" component={Login} />
    <Stack.Screen options={{ headerShown: false, }} name="Home" component={Home} />

    <Stack.Screen options={{
      headerTitle: 'My Profile',
      headerStyle: { backgroundColor: '#e59479' },
      headerTintColor: 'white',
      headerShadowVisible: false,
      headerTitleStyle: { fontSize: 20 },
      headerTitleAlign: 'center'
    }}
      name="Profile" component={Profile} />

    <Stack.Screen options={{
      headerStyle: { backgroundColor: '#f1fdf1' },
      headerShadowVisible: false,
      headerTitle: ''

    }} name="KKB" component={KKB} />

    <Stack.Screen options={{
      headerStyle: { backgroundColor: '#f1fdf1' },
      headerShadowVisible: false,
      headerTitle: ''

    }} name="Kirtan" component={Kirtan} />


    <Stack.Screen options={{
      headerStyle: { backgroundColor: '#f1fdf1' },
      headerShadowVisible: false,
      headerTitle: ''

    }} name="Katha" component={Katha} />


    <Stack.Screen options={{
      headerStyle: { backgroundColor: '#f1fdf1' },
      headerShadowVisible: false,
      headerTitle: ''

    }} name="Books" component={Books} />

    <Stack.Screen options={{
      headerTitle: 'Saadhana Card',
      headerStyle: { backgroundColor: '#e59479' },
      headerTintColor: 'white',
      headerShadowVisible: false,
      headerTitleStyle: { fontSize: 20 },
      headerTitleAlign: 'center'
    }}
      name="Record_saadhana" component={Record_saadhana} />

    <Stack.Screen options={{
      headerTitle: 'Saadhana Card',
      headerStyle: { backgroundColor: '#e59479' },
      headerTintColor: 'white',
      headerShadowVisible: false,
      headerTitleStyle: { fontSize: 20 },
      headerTitleAlign: 'center'
    }}
      name="RecordComSaadhana" component={RecordComSaadhana} />

    <Stack.Screen options={{
      headerTitle: 'Saadhana Report',
      headerStyle: { backgroundColor: '#e59479' },
      headerTintColor: 'white',
      headerShadowVisible: false,
      headerTitleStyle: { fontSize: 20 },
      headerTitleAlign: 'center'
    }}
      name="Saadhana_report" component={Saadhana_report} />

    <Stack.Screen options={{
      headerTitle: 'Saadhana Dashboard',
      headerStyle: { backgroundColor: '#a486de' },
      headerTintColor: 'white',
      headerShadowVisible: false,
      headerTitleStyle: { fontSize: 20 },
      headerTitleAlign: 'center'

    }} name="Review_saadhana" component={Review_saadhana} />


  </Stack.Navigator>
)




export default AppNavigator