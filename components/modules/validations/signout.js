import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const signout = async (navigation) => {
    try {
      console.log("hello")

      const user = auth().currentUser
      if (user) {
        await auth().signOut()
        await GoogleSignin.revokeAccess()
        await GoogleSignin.signOut()
        await AsyncStorage.removeItem('authToken')
        await AsyncStorage.removeItem('userinfo')
        navigation.replace('Login')

        navigation.reset({
          index:0,
          routes:[{name:'Login'}]
        })
      }
      else {
        console.log('error')
      }
    }
    catch (error) {
      console.log(error)
    }
  }

