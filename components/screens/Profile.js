import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Version from '../component/footer';
import { fetchuserinfo } from '../modules/asyncStorage/fetchUserInfo';
import {signout} from '../modules/validations/signout'
import styles from '../assets/styles/stylesProfile';


const Profile = ({ navigation }) => { 
  
  
  useEffect(() => {
    fetchuserinfo(setuserinfo_)
  }, [])

  // fetching userinfo
  const [userinfo_, setuserinfo_] = useState(null)

  const userphoto = userinfo_?.user?.photo
  const username = (userinfo_?.user?.name || "")
    ? userinfo_.user.name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")

    : ""

  const useremail = userinfo_?.user?.email

  
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
              <Image style={styles.small_logo} source={require('../assets/images/star_logo.png')} />
              <Text style={styles.profileBoxText}>Rate Us</Text>
            </View>
            <View style={styles.in_boxes}>
              <Image style={styles.small_logo} source={require('../assets/images/star_logo.png')} />
              <Text style={styles.profileBoxText}>Contact Us</Text>
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
              <Image style={styles.small_logo} source={require('../assets/images/star_logo.png')} />
              <Text style={styles.profileBoxText}>Our Story</Text>
            </View>
            <View style={styles.in_boxes}>
              <Image style={styles.small_logo} source={require('../assets/images/star_logo.png')} />
              <Text style={styles.profileBoxText}>Dedicated To</Text>
            </View>
            <View style={styles.in_boxes}>
              <Image style={styles.small_logo} source={require('../assets/images/star_logo.png')} />
              <Text style={styles.profileBoxText}>Share App</Text>
            </View>
            <View style={styles.in_boxes}>
              <Image style={styles.small_logo} source={require('../assets/images/star_logo.png')} />
              <Text style={styles.profileBoxText}>Terms and Conditions</Text>
            </View>
          </View>

          {/* signout button */}
            <TouchableOpacity onPress={() => signout({navigation})}>
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


export default Profile