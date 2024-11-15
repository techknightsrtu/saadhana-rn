// this is for fetching ALL messages given by its counsellor to show them on notifiation menu

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import  {fetchCurrUserId} from './fetchCurrUserId'

export const fetchFeedback = async ({setfeedback}) => {
    try {
        
        const data=await fetchCurrUserId()
        // console.log(userid)
        // console.log('hi')

        const messageRef = firestore().collection('users').doc(data.userId).collection('Messages')
        // console.log(messageRef)

        const snapshot = await messageRef.get()
        const messsageArray = []

        snapshot.forEach(doc => {
            const data = doc.data()
            messsageArray.push({
                id: doc.id,
                ...data
            })
        })

        setfeedback(messsageArray)
        // console.log(messsageArray)

    } catch (error) {
        console.log(error)
    }

}