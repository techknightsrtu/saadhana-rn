import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { saveAuthToken } from '../asyncStorage/SaveAuthToken';
import { saveuserinfo } from '../asyncStorage/SaveUserInfo';
import { GOOGLE_WEB_CLIENT_ID } from '@env';


export async function callgooglesignin({ navigation,setIsLoggedIn }) {
  try {
    
    // Ensure Google Play Services are available
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Sign in and retrieve user info
    const userinfo = await GoogleSignin.signIn();
    const { idToken } = userinfo; // Extract idToken

    // Check if idToken is available
    if (!idToken) {
      throw new Error("idToken is missing");
    }

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign in with Firebase using the Google credential
    const userCredential = await auth().signInWithCredential(googleCredential);

    // Save token and user info to AsyncStorage
    saveAuthToken(idToken);
    saveuserinfo(userinfo);
    // console.log(idToken)
    setIsLoggedIn(true)
    // Navigate to Home
    navigation.replace('Home');

    // Handle Firestore user collection
    try {
      const userCollection = firestore().collection('users');
      const user = userCredential.user;

      // Query Firestore for the user's document
      const querySnapshot = await userCollection.where('email', '==', user.email).get();

      let docRef;
      if (!querySnapshot.empty) {
        docRef = querySnapshot.docs[0].ref;
      } else {
        docRef = userCollection.doc();
        const docId = docRef.id;

        // Set the new user data
        await docRef.set({
          name: user.displayName,
          email: user.email,
          userId: docId,
        });
      }
    } catch (error) {
      console.error("Firestore error:", error);
    }
  } catch (error) {
    console.error("Google Sign-In error:", error);
  }
}
