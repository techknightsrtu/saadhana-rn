// this is for fetching ALL messages given by its counsellor to show them on notifiation menu

import firestore from '@react-native-firebase/firestore';
import  {fetchCurrUserId} from './fetchCurrUserId'

export const fetchFeedback = async () => {
    try {
        
        const data=await fetchCurrUserId()
        const messageRef = firestore().collection('users').doc(data.userId).collection('Messages')

        const snapshot = await messageRef.get()
        const messageArray = []

        snapshot.forEach(doc => {
            const data = doc.data()
            messageArray.push({
                id: doc.id,
                ...data
            })
        })

        return messageArray

    } catch (error) {
        console.log(error)
    }

}