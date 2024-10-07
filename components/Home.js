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
import styles from './styles/styles_home';

import usefetchdata from './oth_components/get_img_firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Version from './footer';
import auth from '@react-native-firebase/auth';


const Home = ({ navigation, route }) => {
  const [userinfo_, setuserinfo_] = useState(null)
  const [isloading, setisloading] = useState(true)
  const [showbutton,setshowbutton]=useState(false)
  
  // for button
  useEffect(()=>{
    const checkuseraccess=async()=>{
      try{
        const user= auth().currentUser
        if (user){
          const loggeduser=user.displayName

          const counsellor = firestore().collection('Counsellor')
          const querysnapshot=await counsellor.get()
          // console.log(loggeduser)
          // console.log(counsellor)
          // console.log(querysnapshot.size)
          let iscounsellor=false
          
          querysnapshot.forEach((doc)=>{
            const data = doc.data()
            // console.log(doc.id)
            if(data.name===loggeduser){
              
              iscounsellor=true
            }
          })

          setshowbutton(iscounsellor)
        }
      }catch(error){
        console.error(error)
      }
    }
    checkuseraccess()
  },[])


  // function to fetch userinfo from stored asyncstorage
  const fetchuserinfo = async () => {
    try {
      const storeduserinfo = await AsyncStorage.getItem('userinfo')
      if (storeduserinfo) {
        setuserinfo_(JSON.parse(storeduserinfo))
        setisloading(false)
      } else if (route.params?.userinfo) {
        setuserinfo_(route.params.userinfo)
        setisloading(false)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchuserinfo()
  }, [])

  // google profile photo
  const userphoto = userinfo_?.user?.photo;
  // console.log(userinfo_)

  // getting images of user from google
  // useEffect(()=>{
  //   // const userinfo= GoogleSignin.signIn()
  //   console.log(this.props.navigation.getParam(userinfo))
  // },[])

  // getting images from firebase 
  const users = usefetchdata();

  // console.log(users)

  // just an example
  // const [data,setdata]=useState(undefined)
  // const getapidata = async () => {
  //   const url = "https://jsonplaceholder.typicode.com/posts/1"
  //   let result = await fetch(url)
  //   result = await result.json()
  //   setdata(result)
  // }

  // useEffect(() => {
  //   getapidata()
  // }, [])

  // console.log(data)

  //   {
  //     data.length ? 
  //     data.map((item)=>{
  // console.log(item.id)
  //     })
  //     :null
  //   }

  // checking the home page data is loaded or not till then showing a loader
  if (isloading) {
    return (
      <SafeAreaView style={styles.loadingcontainer}>
        <ActivityIndicator color="blue" size="large" />
        <Text>Loading</Text>
      </SafeAreaView>
    )
  }

  const handleimagepress=(index)=>{
    switch (index){
      case 1:
        navigation.navigate('KKB')
        break
    }
  }


  return (
    <ScrollView style={styles.scroll_style}>

      <View style={{ backgroundColor: 'white' }}>

        {/* Top Section */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <View>
            <Text style={styles.HK_style}>
              Hare {"\n"}Krishna !
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                style={styles.logo_style}
                source={{ uri: userphoto }}
              />
            </TouchableOpacity>

          </View>
        </View>

        {/* sliding images */}

        <View style={{ height: 300, marginBottom: 5 }}>
          <Swiper
            autoplay={true}
            loop={true}
            dotStyle={{ backgroundColor: 'rgba(255, 255, 255,0.8)', width: 10, height: 10, borderRadius: 5 }}
            activeDotStyle={{ backgroundColor: 'white', width: 10, height: 10, borderRadius: 5 }}
            contentContainerStyle={styles.contentcontainer}
          >
            {users.map((image, index) => (
              <TouchableOpacity key={index} onPress={()=>handleimagepress(index)} style={styles.slider_style}>
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
              <Image style={{ position: 'absolute', bottom: 0, right: 20, height: 80, width: 30 }} source={require('./images/sadana.png')} />
            </View>
          </TouchableOpacity>

          
          <TouchableOpacity >
            <View style={[styles.cards_style, { backgroundColor: '#fff3c9', marginRight: 20 }]}>
              <Text style={{ color: '#e3b44a', margin: 20, fontSize: 18, fontWeight: 'bold' }}>Saadhana {"\n"}Report</Text>
              <Image style={{ position: 'absolute', bottom: 16, right: 20, height: 40, width: 30 }} source={require('./images/timer.png')} />
            </View>
          </TouchableOpacity>

        </View>


           {showbutton && <TouchableOpacity style={{justifyContent:'center',alignItems:'center',height:50,flex:1,backgroundColor:'#a486de',borderRadius:10,margin:20,marginTop:30,marginBottom:40}}
            onPress={()=>navigation.navigate('Review_saadhana')} >
            <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Review Saadhana</Text>
          </TouchableOpacity>}

        <Version />



      </View>

    </ScrollView>

  )
}



export default Home