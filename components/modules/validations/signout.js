import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signout = async ({navigation}) => {
  try {
    const user = auth().currentUser;
    // console.log(user);
    if (user) {
      await auth().signOut();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userinfo');
      await AsyncStorage.clear(); 

      const token = await AsyncStorage.getItem('authToken');
      console.log('Token after signout:', token);
      // setIsLoggedIn(false)
      // Replacing the current route with the Login screen
      navigation.replace('Login');
    } else {
      console.error('No user logged in');
    }
  } catch (error) {
    console.error(error);
  }
}
