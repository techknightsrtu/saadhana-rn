import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { FIRESTORE_COLLECTION_PATHS } from '../../firebase/firestoreContants'

export const handlesaadhana = async (selectedDate, waketime, sleeptime, dinner, selectedoptiondaysleep, selectedoptionmorning, japa, selectedoptionbookreading, selectedoptionlecturehearing, comment,WakePoint , SleepPoint , DinnerPoint , DaySleepPoints , MorningProgramPoints, japaPoints, bookReadingPoints, lectureHearingPoints  , seterrormsg,setSelectedDate,setwaketime,setsleeptime,setdinner,setselectedoptiondaysleep,setselectedoptionmorning,setjapa,setselectedoptionbookreading,setselectedoptionlecturehearing,setcomment) => {

    const total_points = WakePoint + SleepPoint + DinnerPoint + DaySleepPoints + bookReadingPoints + lectureHearingPoints + MorningProgramPoints + japaPoints

    const user = auth().currentUser
    const username = user?.displayName

    if (!username) {
        console.error('no user')
        return
    }
    console.log("Values to check: ", { selectedDate, waketime, sleeptime, dinner, selectedoptiondaysleep, selectedoptionmorning, japa, selectedoptionbookreading, selectedoptionlecturehearing, comment });


    if ( selectedDate.trim() === '' ||
    (waketime || '').trim() === '' ||  // Provide a fallback
    (sleeptime || '').trim() === '' ||
    (dinner || '').trim() === '' ||
    (selectedoptiondaysleep || '').trim() === '' ||
    (selectedoptionmorning || '').trim() === '' ||
    (japa || '').trim() === '' ||
    (selectedoptionbookreading || '').trim() === '' ||
    (selectedoptionlecturehearing || '').trim() === '' ||
    (comment || '').trim() === '')  
    {
        seterrormsg('All field are required')
    } else {
        seterrormsg('')
        Alert.alert('Success', 'saadhana submitted successfully!')


        try {
            const currentUser = auth().currentUser

            if (!currentUser) {
                console.log('no user signed in')
            }

            const usersCollection = firestore().collection('users');
            const querySnapshot = await usersCollection.where('email', '==', currentUser.email).get();

            let docRef
            if (!querySnapshot.empty) {
                docRef = querySnapshot.docs[0].ref
                // console.log('User exists with ID:', docRef.id)

            } else {
                console.error('user document not found')
            }
            docRef.collection(FIRESTORE_COLLECTION_PATHS.Saadhana)
                .doc(selectedDate)
                .set({
                    date: selectedDate,
                    wake_up_time: waketime,
                    sleep_time: sleeptime,
                    dinner_time: dinner,
                    day_sleep_time: selectedoptiondaysleep,
                    morning_program: selectedoptionmorning,
                    japa_rounds: japa,
                    book_reading: selectedoptionbookreading,
                    lecture_hearing: selectedoptionlecturehearing,
                    comments: comment,
                    score: total_points

                })
                .then(() => {
                    setSelectedDate('')
                    setwaketime('')
                    setsleeptime('')
                    setdinner('')
                    setselectedoptiondaysleep('')
                    setselectedoptionmorning('')
                    setjapa('')
                    setselectedoptionbookreading('')
                    setselectedoptionlecturehearing('')
                    setcomment('Hare Krishna ! All glories to Srila Prabhupada')

                })
                .catch((error) => {
                    console.error(error)
                })

        } catch (error) {
            console.log(error)
        }

    }



}