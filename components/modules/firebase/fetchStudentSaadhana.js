import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const fetchStudentSaadhana=async({studentid,selectedDate,setstudentdata,setisLoading})=>{
    
        try {
            const user = auth().currentUser
            if (!user) {
                console.log('no user signed in')
                return
            }

            const saadhanaDoc = await firestore()
                .collection('users')
                .doc(studentid)
                .collection('Saadhana')
                .doc(selectedDate)
                .get()            

            if (saadhanaDoc.exists) {
                setstudentdata(saadhanaDoc.data())
                setisLoading(false)
                

            } else {
                console.log('no data')
            }

        } catch (error) {
            console.log(error)
        }
    
}