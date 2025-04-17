import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../assets/styles/stylesLogin';
import { callgooglesignin } from '../modules/validations/signin';
import { checkUserAuth } from '../modules/validations/userAuthExisting';

const Login = ({ navigation,route }) => {
  const { setIsLoggedIn } = route.params;
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the rotation animation
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 70000, // 70 seconds
        useNativeDriver: true,
      })
    ).start();
  }, [rotateValue]);

  // Interpolating the rotation value
  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });


  return (
    
    <View style={{ flex: 1, backgroundColor: 'white' }}>
       


      {/* upper part */}
      <View style={styles.login_upper}>
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
          <Text style={styles.google_style} onPress={() => callgooglesignin({ navigation, setIsLoggedIn })}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


export default Login