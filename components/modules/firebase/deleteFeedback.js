import firestore from "@react-native-firebase/firestore";
import { fetchCurrUserId } from './fetchCurrUserId'

export const deleteFeedback = async ({setfeedback}) => {
    try {
        const data = await fetchCurrUserId()
        const messageRef = firestore().collection('users').doc(data.userId).collection('Messages')

        const snapshot = await messageRef.get()
        if (!snapshot.empty) {
            const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
            await Promise.all(deletePromises);
            setfeedback([])
            console.log("Feedback deleted");
        }else{
            console.log("no feedback msg")
        }
    } catch (error) {
        console.log(error)
    }

}