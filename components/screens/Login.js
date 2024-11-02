import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../assets/styles/stylesLogin';
import { callgooglesignin } from '../modules/validations/signin';
import { checkUserAuth } from '../modules/validations/userAuthExisting';

const Login = ({ navigation }) => {

  useEffect(() => {
    checkUserAuth(navigation)
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* upper part */}
      <View style={styles.login_upper}>
        {/* <Text  style={styles.sadana_style}>Saadhana</Text> */}
        <Image style={styles.logo_style} source={require('../assets/images/saadhana_logo.png')} resizeMode='contain' />
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
          <Image style={{ height: 30, width: 30, marginRight: 10 }} source={require('../assets/images/googlelogo.png')} />
          <Text style={styles.google_style} onPress={()=>callgooglesignin(navigation)}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login