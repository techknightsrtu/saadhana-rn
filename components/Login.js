import React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import auth from '@react-native-firebase/auth'


const Login = ({ navigation }) => {
    const callgooglesignin = async () => {
      try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
        // const userinfo=await GoogleSignin.signIn()
        // console.log('user info',userinfo)
  
        const { idToken } = await GoogleSignin.signIn()
        const googleCredential = auth.GoogleAuthProvider.credential(idToken)
        await auth().signInWithCredential(googleCredential)
        navigation.replace('Home')
      }
      catch (error) {
        console.error(error)
      }
    }
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