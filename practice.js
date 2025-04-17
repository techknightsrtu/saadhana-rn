// import React, { useState, useEffect } from "react";
import { View, Text, Image, ImageBackground, Dimensions, ScrollView, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import storage from '@react-native-firebase/storage';
// import firestore, { onSnapshot } from '@react-native-firebase/firestore';
import database, { set } from '@react-native-firebase/database';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// import firebaseApp from '@react-native-firebase/app';
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import auth from '@react-native-firebase/auth';

// // const app = () => {
// //     const [loading, setLoading] = useState(false); 
// //     const [users_images, setusers_images] = useState([]);

// //   //   useEffect(() => {
// //     //     getDataFromFirestore()
// //     //   }, [loading])

// //       const [imagedata, setimagedata] = useState(null)
// //       const [imageurl, setimageurl] = useState('')

// //       const opencamera = async () => {
// //           const result = await launchCamera({ mediaType: 'photo' });
// //           setimagedata(result) 
// //         }

// //       useEffect(() => {
// //         console.log({appName : firebaseApp.apps[0].name})
// //         const subscriber = firestore()
// //           .collection('users_images')
// //           .get()
// //           .then(querySnapshot => {
// //             const users = [];
// //             console.log({querySnapshot})
// //             querySnapshot.forEach(documentSnapshot => {
// //               console.log(documentSnapshot)
// //               users.push({ 
// //                 ...documentSnapshot.data(),
// //                 key: documentSnapshot.id,
// //               });
// //             });

// //             setusers_images(users);
// //             setLoading(false);
// //           });

// //         // Unsubscribe from events when no longer in use
// //         return () => subscriber();
// //       },[loading]);
// //       console.log({users_images})
// //   const uploadimage = async () => {
// //     const reference = storage().ref(imagedata.assets[0].fileName);
// //     const pathToFile = imagedata.assets[0].uri;
// //     // uploads file
// //     await reference.putFile(pathToFile);
// //     const url = await storage().ref(imagedata.assets[0].fileName).getDownloadURL();

// //   }

// //   // const data = [
// //   //   { uri: 'https://firebasestorage.googleapis.com/v0/b/saadhana-ffdea.appspot.com/o/rn_image_picker_lib_temp_b27484a0-af24-4418-a0ab-d10f52f8e34d.jpg?alt=media&token=71f33e8d-b325-421c-ae57-5649ce83821f' },
// //   //   { uri: 'https://firebasestorage.googleapis.com/v0/b/saadhana-ffdea.appspot.com/o/rn_image_picker_lib_temp_b27484a0-af24-4418-a0ab-d10f52f8e34d.jpg?alt=media&token=71f33e8d-b325-421c-ae57-5649ce83821f' }
// //   // ];
// //   // if (loading) {
// //   //   return <ActivityIndicator />;
// //   // }

// //   const setLoadingValue = () => {
// //     console.log('setting loading value : ',!loading)
// //     setLoading(!loading)
// //   }

// //   return (
// //     <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} resizeMode="cover" source={require('./components/sliding_img/img1.jpg')}>
// //       <View style={{ flex: 1, backgroundColor: 'white' }}>
// //         {/* Top Section */}
// //         <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
// //           <View>
// //             <Text onPress={setLoadingValue} style={{ fontSize: 30, fontWeight: 'bold', color: 'pink', marginTop: 30, marginLeft: 10 }}>
// //               Hare {"\n"}Krishna !
// //             </Text>
// //           </View>
// //           <View>
// //             <Image

// //               style={{
// //                 height: 60,
// //                 width: 60,
// //                 borderRadius: 30,
// //                 marginLeft: 150,
// //                 marginTop: 40,
// //                 borderColor: 'pink',
// //                 borderWidth: 1
// //               }}
// //               source={require('./components/sliding_img/img1.jpg')}
// //             />
// //           </View>
// //         </View>

// //         {/* data={users}
// //       renderItem={({ item }) => (
// //         <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// //           <Text>User ID: {item.id}</Text>
// //           <Text>User Name: {item.name}</Text>
// //         </View>
// //       )} */}

// //         {/* sliding images  */}
// //         {/* <View style={{ flex: 1.4 }}>
// //           <Swiper
// //             autoplay={true}
// //             dotStyle={{ backgroundColor: 'rgba(255, 255, 255,0.8)', width: 10, height: 10, borderRadius: 5 }}
// //             activeDotStyle={{ backgroundColor: 'white', width: 10, height: 10, borderRadius: 5 }}
// //           >
// //           data={users_images}
// //             {data.map((image, index) => (
// //               <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
// //                 <Image
// //                   source={data.imageurl}
// //                   style={{ width: 320, height: 350, resizeMode: 'cover', marginTop: 30, borderRadius: 20 }}
// //                 />
// //               </View>
// //             ))}
// //           </Swiper>
// //         </View> */}

// //         {/* Bottom Section */}
// //         {/* <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
// //           <View style={{ flex: 1, backgroundColor: '#ffdee7', margin: 10, height: 200,marginTop:30, marginLeft: 20, borderRadius: 20 }}>
// //             <Text style={{ color: '#f50294', margin: 20, fontSize: 18 }}>Record {"\n"}Saadhana</Text>
// //             <Image style={{ position: 'absolute', bottom: 0, right: 20, height: 80, width: 30 }} source={require('./components/sadana.png')} />
// //           </View>
// //           <View style={{ flex: 1, backgroundColor: '#feffd9', margin: 10, height: 200,marginTop:30, marginRight: 20, borderRadius: 20 }}>
// //             <Text style={{ color: '#ffb508', margin: 20, fontSize: 18 }}>Saadhana {"\n"}Report</Text>
// //             <Image style={{ position: 'absolute', bottom: 16, right: 20, height: 35, width: 30 }} source={require('./components/timer.png')} />
// //           </View>
// //         </View>*/}
// //         <View style={{ flex: 1 }}>
// //           <TouchableOpacity style={{ flex: 1, height: 20, width: 200, borderWidth: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} onPress={opencamera} >
// //             <Text style={{ color: 'pink' }}>opencamera</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity style={{ flex: 1, height: 20, width: 200, borderWidth: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} onPress={uploadimage} >
// //             <Text style={{ color: 'pink' }}>Upload image</Text>
// //           </TouchableOpacity>
// //         </View>


// //       </View>
// //     </ImageBackground>
// //   );
// // };

// const App = () => {
//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: '508173442327-kb1av3p6bb3rg9fplkrdd6676b1vv160.apps.googleusercontent.com',
//     });
//   }, [load]);

//   async function signin() {
//     // Check if your device supports Google Play
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//     // Get the users ID token
//     const { idToken } = await GoogleSignin.signIn();

//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//     // Sign-in the user with the credential
//     return auth().signInWithCredential(googleCredential);
//   }

//   const [loading,setLoading]=useState(false)
// const load=()=>{
//   console.log(!loading)
//   signin()
// }

//   return (
//     <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
//       <Button onPress={load()} title="Sign in with Google" />
//     </View>
//   );
// };

// export default App;


// method 1
// const [loading, setLoading] = useState(true); // Set loading to true on component mount
// const [users, setUsers] = useState([])

// useEffect(() => {
//   const subscriber = firestore()
//     .collection('users_images')
//     .onSnapshot(querySnapshot => {
//       const users = [];

//       querySnapshot.forEach(documentSnapshot => {
//         users.push({
//           ...documentSnapshot.data(),
//           key: documentSnapshot.id,
//         });
//       });

//       setUsers(users);
//       setLoading(false);
//     });

//   // Unsubscribe from events when no longer in use
//   return () => subscriber();
// }, []);

// console.log(users)


// const user =  firestore().collection('users_images').doc('fycgLBvF3ZjBv3qGIBMf').get();
// console.log(user)

// function onResult(QuerySnapshot) {
//   console.log('Got Users collection result.');

//   QuerySnapshot.forEach((doc)=>{
//     console.log('hi')
//     console.log(doc.id,'=>',doc.data())

//   })
// }
// function onError(error) {
//   console.error(error);
// }

// firestore().collection('users_images').get()
// .then(onResult)
// .catch(onError)

// const [imageurl,setimageurl]=useState('')

// collecting data from firebase and showing images from url in the sliding window 
// const App = () => {
//   const [imageurl, setImageurl] = useState([]);
//   async function fetchUserData() {
//     try {
//       const querySnapshot = await firestore().collection('user_images').get();
//       const users = [];
      
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         if (data.imageurl) { // Ensure imageUrl exists
//           users.push({ uri: data.imageurl });
//         }
//       });
//       // querySnapshot.forEach((doc) => {
//       //   users.push(doc.data());
//       // });


//       setImageurl(users)

//       // return users; 
//     } catch (error) {
//       console.error('Error fetching user images collection:', error);
//       setImageurl([]);
//     }
//   }


//   // fetchUserData().then((users) => {
//   //   console.log(users); 
//   // });

//   useEffect(() => {
//     fetchUserData()
//   }, [])

//   // useEffect(()=>{
//   //   console.log(imageurl)
//   // },[imageurl])
//   console.log(imageurl)


//   return (
//     <View style={{ flex: 1,backgroundColor:'white' }}>
//       <Swiper
//         autoplay={true}
//         dotStyle={{ backgroundColor: 'rgba(255, 255, 255,0.8)', width: 10, height: 10, borderRadius: 5 }}
//         activeDotStyle={{ backgroundColor: 'white', width: 10, height: 10, borderRadius: 5 }}
//       >

//         {imageurl.map((image, index) => (
          
//           < View key = { index } style = {{ justifyContent: 'center', alignItems: 'center' }}>
//         <Image

//           source={image}
//           style={{ width: 320, height: 350, resizeMode: 'cover', marginTop: 30, borderRadius: 20 }}
//         />
//     </View>
//   ))
// }
//       </Swiper >
//     </View >
//   )
// }

// const Stack=createNativeStackNavigator()
// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator  initialRouteName="Login">
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Home" component={Home} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const Login = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

//       <TouchableOpacity style={{flex:1,alignItems:'center',flexDirection:'row'}} onPress={() => navigation.navigate('Home')}>
//         <Image style={{height:30,width:30}} source={require('./components/googlelogo.png')}/>
//         <Text style={{ fontSize: 30, color: 'pink' }}>Go to Home</Text>
//       </TouchableOpacity> 
//     </View>
//   );
// };
// const Home = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{ fontSize: 30, color: 'pink' }}>Home Screen</Text>
//     </View>
//   );
// };

// export default App;

// third party api

const App=()=>{
  const getapidata=async()=>{
    const url="https://jsonplaceholder.typicode.com/posts/1"
    let result=await fetch()
    result=await result.json()
    console.log(result)
  }
  useEffect(()=>{
    getapidata()
  },[])
}

// export default App