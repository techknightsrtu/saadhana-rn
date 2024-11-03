import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const handleFeedback = ({studentid,studentdata,Feedback,setFeedback,setmodalVisible}) => {
    // console.log(studentid)
    // console.log(studentdata.date)
    try {
        firestore()
            .collection('users')
            .doc(studentid)
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