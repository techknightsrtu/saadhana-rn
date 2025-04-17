import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const fetchUnderStudent = async ({setstudent}) => {
    try {
        const user = auth().currentUser

        if (user) {
            const username = user.displayName
            const collectionname = `${username} Counsellor`

            const studentref = firestore().collection(collectionname)
            const querysnapshot = await studentref.get()

            if (querysnapshot.empty) {
                console.log('no under student found')
                setstudent([])
                return
            }

            const studentdata = querysnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setstudent(studentdata)
        } else {
            console.log('no user logged in')
        }
    } catch (error) {
        console.error(error)
    }
}