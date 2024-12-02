import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { saveAuthToken } from '../asyncStorage/SaveAuthToken';
import { saveuserinfo } from '../asyncStorage/SaveUserInfo';
// import { setUserAuth } from '../../app/Slices/authSlice';


export async function callgooglesignin({navigation}) {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userinfo = await GoogleSignin.signIn()

      const { idToken } = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      
      saveAuthToken(idToken)
      saveuserinfo(userinfo)
      

      navigation.replace('Home')

      try {
        const userCollection = firestore().collection('users')
        const querySnapshot = await userCollection.where('email', '==', user.email).get()
        let docRef
        if (!querySnapshot.empty) {
          docRef = querySnapshot.docs[0].ref;
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