import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export const add_student_counsellor = async ({email_student_counsellor,set_email_student_counsellor,seterrormsg_counsellor}) => {

    // checking for null input
    if (email_student_counsellor.trim() === '') {
        seterrormsg_counsellor('Email is empty')
        return
    } else {
        seterrormsg_counsellor('')
    }

    let counsellorId = null
    let counsellorName = null

    // first finding under user and taking all data
    try {
        const usercollection = firestore().collection('users')
        const querySnapshot = await usercollection.where('email', '==', email_student_counsellor).get()
        // console.log(querySnapshot)

        if (!querySnapshot.empty) {
            querySnapshot.forEach((documentsnapShot) => {
                const data = documentsnapShot.data()
                counsellorId = data.userId
                counsellorName = data.name
                // console.log(id_counsellor)

            })

        } else {
            console.log('no such user')
            Alert.alert('Error', 'No user found with this email.')
            return
        }

        const counselorCollection = firestore().collection('Counsellor')
        const studentDoc = await counselorCollection.get()
        let studentexist = false

        studentDoc.forEach((doc) => {
            const studentdata = doc.data()
            if (studentdata.id === counsellorId) {
                studentexist = true
            }
        })

        if (studentexist) {
            Alert.alert('This student is already counsellor.')
            set_email_student_counsellor('')

        } else {
            await counselorCollection.doc(counsellorId).set({
                id: counsellorId,
                name: counsellorName
            })

            Alert.alert('Success', 'student is now a counsellor')
            set_email_student_counsellor('')

        }
    } catch (error) {
        console.log(error)
    }
    // setting id,name under that counsellor    
}
