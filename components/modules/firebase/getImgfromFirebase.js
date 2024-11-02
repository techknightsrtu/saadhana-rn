import React, { useEffect, useState } from 'react';
import {Image} from 'react-native'
import firestore from '@react-native-firebase/firestore';



// getting images from firebase 
const usefetchdata=()=>{
const [users,setusers]=useState([])

useEffect(()=>{
  const fetchdata=async()=>{
    try{
      const userscollections=await firestore().collection('sliding_img').get()
      const userdata=userscollections.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      }))
      setusers(userdata)
    }catch(error){
      console.log(error)
    }
  } 
  fetchdata()
 },[])

 return users
}
 
export default usefetchdata
