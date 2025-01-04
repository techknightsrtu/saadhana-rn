import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const handleFeedback = ({userId,studentdata,Feedback,setFeedback,setmodalVisible}) => {
    try {
        firestore()
            .collection('users')
            .doc(userId)
            .collection('Messages')
            .doc(studentdata.date)
            .set({
                feedback: Feedback
            })
            .then(() => {
                setFeedback("")
            })

        setmodalVisible(false)
    } catch (error) {
        console.log(error)
    }
}