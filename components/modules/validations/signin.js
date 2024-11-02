import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'


 // save users authentication state
 const saveAuthToken = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token)
    } catch (error) {
      console.error(error)
    }
  }

  // save userinfo in asyncstorage so that we can retrieve it on reopening the app
  const saveuserinfo = async (userinfo) => {
    try {
      await AsyncStorage.setItem('userinfo', JSON.stringify(userinfo))

    } catch (error) {
      console.error(error)
    }
  }


export async function callgooglesignin(navigation) {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userinfo = await GoogleSignin.signIn()

      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      await saveAuthToken(idToken)

      const { user } = userinfo
      await saveuserinfo(userinfo)

      navigation.replace('Home')


      // writing details of new user under users section in firebase

      try {
        const userCollection = firestore().collection('users')
        const querySnapshot = await userCollection.where('email', '==', user.email).get()
        // console.log(querySnapshot)
        let docRef
        if (!querySnapshot.empty) {
          docRef = querySnapshot.docs[0].ref;
          // console.log('User already exists with ID:', docRef.id);
        } else {
          docRef = userCollection.doc()
          const docId = docRef.id

          await docRef.set({
            name: user.name,
            email: user.email,
            userId: docId
          })
        }

      } catch (error) {
        console.log(error)
      }

    }
    catch (error) {
      console.error(error);
    }
  }