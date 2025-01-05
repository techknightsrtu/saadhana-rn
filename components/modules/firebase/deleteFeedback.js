import firestore from "@react-native-firebase/firestore";
import { fetchCurrUserId } from './fetchCurrUserId'
import { clearFeedback } from "../../app/slices/FeedbackSlice";

export const deleteFeedback = async ({dispatch,setfeedback}) => {
    try {
        const data = await fetchCurrUserId()
        const messageRef = firestore().collection('users').doc(data.userId).collection('Messages')

        const snapshot = await messageRef.get()
        if (!snapshot.empty) {
            const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
            await Promise.all(deletePromises);
            dispatch(clearFeedback())
            
        }else{
            console.log("no feedback message")
        }
    } catch (error) {
        console.log(error)
    }

}