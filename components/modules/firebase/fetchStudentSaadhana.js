import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const fetchStudentSaadhana=async({userId, selectedDate})=>{
    console.log(userId)
        try {
            const user = auth().currentUser
            if (!user) {
                console.log('no user signed in')
                return
            }

            const saadhanaDoc = await firestore()
                .collection('users')
                .doc(userId)
                .collection('Saadhana')
                .doc(selectedDate)
                .get()            

            if (saadhanaDoc.exists) {
                return (saadhanaDoc.data())                

            } else {
                console.log('no data')
                return {}
            }

        } catch (error) {
            console.log(error)
            return {}
        }
    
}