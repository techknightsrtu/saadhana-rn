import React from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const Home = ({ navigation }) => {
  const signOut=async()=>{
    try{
      const user = auth().currentUser
      if (user){
    await auth().signOut()
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
    navigation.navigate('Login')}
    else{
      console.log('error')
    }
  }
    catch(error){
      console.log(error)
    }
  }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ borderWidth: 2, fontSize: 20, padding: 10, color: 'pink' }} onPress={signOut}>Sign Out</Text>
      </View>
    )
  }

export default Home