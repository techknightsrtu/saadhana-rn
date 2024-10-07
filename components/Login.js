import React, { useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles/styles_login';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'
import firebase from '@react-native-firebase/app';





const Login = ({ navigation }) => {

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

  // retrieve users authentication state
  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken')
      return token
    } catch (error) {
      console.error(error)
      return null
    }
  }


  // making usestate to contain the userinfo so that it can pass on to home even after reopening the app


  async function callgooglesignin() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userinfo = await GoogleSignin.signIn()

      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      await saveAuthToken(idToken)

      const { user } = userinfo
      await saveuserinfo(userinfo)

      navigation.replace('Home', { userinfo })


      // writing details of new user under users section in firebase

      try {
        const userCollection = firestore().collection('users')
        const querySnapshot = await userCollection.where('email', '==', user.email).get()
        // console.log(querySnapshot)
        let docRef
        if (!querySnapshot.empty) {
          docRef = querySnapshot.docs[0].ref;
          console.log('User already exists with ID:', docRef.id);
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

  useEffect(() => {
    const checkUserAuth = async () => {
      const token = await getAuthToken()
      if (token) {
        const storeduserinfo = await AsyncStorage.getItem('userinfo')
        const userinfo = storeduserinfo ? JSON.parse(storeduserinfo) : null
        navigation.replace('Home', { userinfo })
      }
    }
    checkUserAuth()
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* upper part */}
      <View style={styles.login_upper}>
        {/* <Text  style={styles.sadana_style}>Saadhana</Text> */}
        <Image style={styles.logo_style} source={require('./images/saadhana_logo.png')} resizeMode='contain' />
        <Text style={styles.bg_style}>
          युक्ताहारविहारस्य {"\n"} युक्तचेष्टस्य कर्मसु । {"\n"}
          युक्तस्वप्‍नावबोधस्य {"\n"} योगो भवति दु:खहा ॥ {"\n"}
          <Text style={styles.shloka_no}>श्रीमद्भगवद्गीता अध्याय 6
            श्लोक 17</Text>
        </Text>
      </View >

      {/* lower part */}
      <View style={styles.login_lower}>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          <Image style={{ height: 30, width: 30, marginRight: 10 }} source={require('./images/googlelogo.png')} />
          <Text style={styles.google_style} onPress={callgooglesignin}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login