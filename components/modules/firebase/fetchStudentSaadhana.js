import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const fetchStudentSaadhana=async({studentid,selectedDate,setstudentdata})=>{
    
        try {
            const user = auth().currentUser
            if (!user) {
                console.log('no user signed in')
                return
            }

            // const username = user.displayName
            // setusername(username)

            const saadhanaDoc = await firestore()
                .collection('users')
                .doc(studentid)
                .collection('Saadhana')
                .doc(selectedDate)
                .get()

            // console.log(saadhanaDoc.data())

            // fetching name using studentid 
            

            if (saadhanaDoc.exists) {
                setstudentdata(saadhanaDoc.data())

            } else {
                console.log('no data')
                // setstudentdata([])
            }

        } catch (error) {
            console.log(error)
        }
    
}