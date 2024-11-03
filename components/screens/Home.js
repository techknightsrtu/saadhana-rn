import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Touchable, ActivityIndicator } from 'react-native';

import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userinfo from './Login';
import { SafeAreaView } from 'react-native-safe-area-context';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import SlidingImageCarousel from './sliding_img';
import database, { set } from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore';
import styles from '../assets/styles/stylesHome';

import usefetchdata from '../modules/firebase/getImgfromFirebase'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Version from '../component/footer';
import auth from '@react-native-firebase/auth';
import { fetchFeedback } from '../modules/firebase/fetchfeedback';
import { fetchuserinfo } from '../modules/asyncStorage/fetchUserInfo';
import { checkuseraccess } from '../modules/firebase/fetchuseraccess';


const Home = ({ navigation }) => {
  const [userinfo_, setuserinfo_] = useState(null)
  const [isloading, setisloading] = useState(true)
  const [showbutton, setshowbutton] = useState(false)
  // modal pop up view 
  const [modalVisible, setmodalVisible] = useState(false)
  const [feedback, setfeedback] = useState([])

  const toggleModal = () => {
    setmodalVisible(!modalVisible)
  }


  useEffect(() => {
    checkuseraccess(setshowbutton)
    fetchuserinfo(setuserinfo_).then(()=>setisloading(false))
    fetchFeedback({setfeedback})
  }, [])
  // console.log(feedback)



  // google profile photo
  const userphoto = userinfo_?.user?.photo;


  // getting images from firebase 
  const users = usefetchdata();

  // checking the home page data is loaded or not till then showing a loader
  if (isloading) {
    return (
      <SafeAreaView style={styles.loadingcontainer}>
        <ActivityIndicator color="blue" size="large" />
        <Text>Loading</Text>
      </SafeAreaView>
    )
  }

  const handleimagepress = (index) => {
    switch (index) {
      case 1:
        navigation.navigate('KKB')
        break
    }
  }

  const handleProfileNavigation = () => {
    console.log("Navigating to Profile")
    navigation.navigate('Profile')
  }


  return (
    <ScrollView style={styles.scroll_style}>

      <View style={{ backgroundColor: 'white' }}>

        {/* Top Section */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

          <Text style={styles.HK_style}>
            Hare {"\n"}Krishna !
          </Text>

          <TouchableOpacity onPress={toggleModal}>
            <Image
              style={{ height: 40, width: 40, position: 'absolute', top: 35, left: 120 }}
              source={require('../assets/images/notification.png')}
            />
          </TouchableOpacity>

          {modalVisible && (
            <View style={styles.popupContainer}>

              <View style={styles.popup}>

                <Text style={styles.popupText}>Your Messages!</Text>
                {feedback.length > 0 ? (
                  feedback.map((message) => (

                    <View key={message.id}>
                      <View style={styles.msg_box}>
                        <Text style={{ color: 'black', fontSize: 18, flex: 1 }}>{message.feedback}</Text>
                        <View style={{ position: 'absolute', bottom: 5, right: 10 }}>
                          <Text style={{ color: 'black', textAlign: 'justify', fontSize: 11 }} >{message.id}</Text>
                        </View>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.popupText}>No Messages Found!</Text>
                )}

                <TouchableOpacity style={styles.cancel_button} onPress={toggleModal}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity onPress={handleProfileNavigation}>
            <Image
              style={styles.logo_style}
              source={{ uri: userphoto }}
            />
          </TouchableOpacity>

        </View>

        {/* sliding images */}

        <View style={{ height: 300, marginBottom: 5 }}>
          <Swiper
            autoplay={true}
            loop={true}
            dotStyle={styles.dotStyle}
            activeDotStyle={{ backgroundColor: 'white', width: 10, height: 10, borderRadius: 5 }}
            contentContainerStyle={styles.contentcontainer}
          >
            {users.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => handleimagepress(index)} style={styles.slider_style}>
                <Image
                  // source={{ uri: image.imageurl }}
                  source={{ uri: image.imageurl }}
                  style={styles.sliding_img_style}
                />
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        {/* <SafeAreaView style={{ flex: 1 }}>
          <SlidingImageCarousel />
        </SafeAreaView> */}

        {/* Bottom Section */}
        <Text style={styles.dai_sadana_style}>Daily Saadhana</Text>

        <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Record_saadhana') }}>
            <View style={[styles.cards_style, { backgroundColor: '#ffede3', marginLeft: 20 }]}>
              <Text style={{ color: '#be6753', margin: 20, fontSize: 18, fontWeight: 'bold' }}>Record {"\n"}Saadhana</Text>
              <Image style={{ position: 'absolute', bottom: 0, right: 20, height: 80, width: 30 }} source={require('../assets/images/sadana.png')} />
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => { navigation.navigate('Saadhana_report') }} >
            <View style={[styles.cards_style, { backgroundColor: '#fff3c9', marginRight: 20 }]}>
              <Text style={{ color: '#e3b44a', margin: 20, fontSize: 18, fontWeight: 'bold' }}>Saadhana {"\n"}Report</Text>
              <Image style={{ position: 'absolute', bottom: 16, right: 20, height: 40, width: 30 }} source={require('../assets/images/timer.png')} />
            </View>
          </TouchableOpacity>

        </View>


        {showbutton && <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 50, flex: 1, backgroundColor: '#a486de', borderRadius: 10, margin: 20, marginTop: 30, marginBottom: 40 }}
          onPress={() => navigation.navigate('Review_saadhana')} >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Admin Portal</Text>
        </TouchableOpacity>}

        <Version />



      </View>

    </ScrollView>

  )
}


export default Home