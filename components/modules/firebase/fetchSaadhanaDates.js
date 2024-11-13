import { collection, getDocs } from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { fetchCurrUserId } from "./fetchCurrUserId";

export const fetchSaadhanaDates=async()=>{
    try{
        const userData=await fetchCurrUserId()
        const datesCollection=firestore().collection(`users/${userData.userId}/Saadhana`)
        const dateSnapshot=await getDocs(datesCollection)

        const datesList=dateSnapshot.docs.map(doc=>doc.id)

        return datesList
    }catch(error){
        console.log(error)
    }
}