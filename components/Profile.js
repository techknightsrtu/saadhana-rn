import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Version from './footer';


const Profile = ({ navigation }) => {
  const user = auth().currentUser
  const signOut = async () => {
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

  useEffect(() => {
    fetchuserinfo()
  }, [])

  // fetching userinfo
  const [userinfo_, setuserinfo_] = useState(null)
  const fetchuserinfo = async () => {
    try {
      const storeduserinfo = await AsyncStorage.getItem('userinfo')
      if (storeduserinfo) {
        setuserinfo_(JSON.parse(storeduserinfo))

      } else if (route.params?.userinfo) {
        setuserinfo_(route.params.userinfo)

      }
    }
    catch (error) {
      console.error(error)
    }
  }


  const userphoto = userinfo_?.user?.photo
  const username = (userinfo_?.user?.name || "")
    ? userinfo_.user.name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")

    : ""

  const useremail = userinfo_?.user?.email

  console.log
  return (
    <View style={{ flex: 1, backgroundColor: '#e59479' }}>

      <ScrollView style={{ flex: 1,paddingHorizontal:0 }}>

        <View style={{  alignItems: 'center', backgroundColor: '#f9eae3', borderRadius: 25 }}>

          {/* google image , name and email */}
          <View style={{ alignItems: 'center' }}>
            <Image style={styles.logo}
              source={{ uri: userphoto }} />
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.email}>{useremail}</Text>
          </View>

          {/* feedback boxes */}
          <View style={styles.out_boxes}>
            <View>
              <Text style={{ color: '#121212', fontSize: 16, fontWeight: 'bold' }}>Feedback</Text>
              <Text style={{ color: '#757575', fontSize: 10, marginBottom: 10 }}>Report an error? Need help?</Text>
            </View>
            {/* code for boxes inside outside box */}
            <View style={styles.in_boxes}>
              <Image style={styles.small_logo} source={require('./images/star_logo.png')} />
              <Text style={{ color: 'black', padding: 10, fontWeight: 'bold', fontSize: 14 }}>Rate Us</Text>
            </View>
            <View style={styles.in_boxes}>
              <Image style={styles.small_logo} source={require('./images/star_logo.png')} />
              <Text style={{ color: 'black', padding: 10, fontWeight: 'bold', fontSize: 15 }}>Contact Us</Text>
            </View>
          </View>

          {/* about boxes */}
          <View style={styles.out_boxes}>
            <View>
              <Text style={{ color: '#121212', fontSize: 16, fontWeight: 'bold' }}>About App</Text>
              <Text style={{ color: '#757575', fontSize: 10, marginBottom: 10 }}>Who we are?</Text>
            </View>
            {/* code for boxes inside outside box */}
            <View style={styles.in_boxes}>
              <Image style={styles.small_logo} source={require('./images/star_logo.png')} />
              <Text style={{ color: 'black', padding: 10, fontWeight: 'bold', fontSize: 14 }}>Our Story</Text>
            </View>
            <View style={styles.in_boxes}>
              <Image style={styles.small_logo} source={require('./images/star_logo.png')} />
              <Text style={{ color: 'black', padding: 10, fontWeight: 'bold', fontSize: 15 }}>Dedicated To</Text>
            </View>
            <View style={styles.in_boxes}>
              <Image style={styles.small_logo} source={require('./images/star_logo.png')} />
              <Text style={{ color: 'black', padding: 10, fontWeight: 'bold', fontSize: 15 }}>Share App</Text>
            </View>
            <View style={styles.in_boxes}>
              <Image style={styles.small_logo} source={require('./images/star_logo.png')} />
              <Text style={{ color: 'black', padding: 10, fontWeight: 'bold', fontSize: 15 }}>Terms and Conditions</Text>
            </View>
          </View>

          {/* signout button */}
            <TouchableOpacity onPress={signOut}>
          <View style={styles.signout}>
            <Text style={{ color: '#fff8f1', fontWeight: 'bold' }} >Sign Out</Text>
          </View>
            </TouchableOpacity>

          {/* bottom section */}
          <Version />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    color: 'white'
  },
  logo: {
    height: 90,
    width: 90,
    borderRadius: 45,
    marginTop: 20
  },
  name: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 5
  },
  email: {
    color: '#776863',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 10
  },
  out_boxes: {

    backgroundColor: 'white',
    margin: 8,
    borderRadius: 20,
    alignItems: 'flex-start',
    padding: 10,

  },
  in_boxes: {
    backgroundColor: '#fef3ef',
    borderRadius: 20,
    width: 300,
    margin: 7,
    padding: 8,
    flexDirection: 'row'
  },
  small_logo: {
    padding: 9,
    marginTop: 10,
    resizeMode: 'cover',
    margin: 6,
    height: 10,
    width: 20
  },
  signout: {
    backgroundColor: '#dc4336',
    borderRadius: 15,
    padding: 10,
    margin: 30
  }
})

export default Profile