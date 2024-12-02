import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { fetchCurrUserId } from './fetchCurrUserId';

export const add_student = async ({seterrormsg,email_student,setEmail_student}) => {

    // checking for null input
    if (email_student.trim() === '') {
        seterrormsg('Email is empty')
        return
    } else {
        seterrormsg('')
    }
    
    const user = auth().currentUser
    const username = user.displayName
    const collectionname = `${username} Counsellor`

    // first finding under user and taking all data

    try {
        const usercollection = firestore().collection('users')
        const querySnapshot = await usercollection.where('email', '==', email_student).get()

        let studentId = null
        let studentName = null

        if (!querySnapshot.empty) {
            querySnapshot.forEach((documentsnapShot) => {
                const data = documentsnapShot.data()
                studentId = data.userId
                studentName = data.name

            })
        } else {
            console.log('no such user')
            Alert.alert('Error', 'No user found with this email.')
            return
        }

        const counselorCollection = firestore().collection(collectionname)
        const studentDoc = await counselorCollection.get()
        let studentexist = false

        studentDoc.forEach((doc) => {
            const studentdata = doc.data()

            if (studentdata.id === studentId) {
                studentexist = true
            }
        })

        if (studentexist) {
            Alert.alert('This student is already under you.')
            setEmail_student('')

        } else {
            await counselorCollection.doc(studentId).set({
                id: studentId,
                name: studentName
            })

            Alert.alert('Success', 'student is added under you.')
            setEmail_student('')

        }
    } catch (error) {
        console.log(error)
    }

}