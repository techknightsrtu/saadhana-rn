import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const fetchUnderStudent = async ({setstudent}) => {
    try {
        const user = auth().currentUser

        if (user) {
            const username = user.displayName
            // setusername_(username)
            const collectionname = `${username} Counsellor`
            // console.log(collectionname)

            const studentref = firestore().collection(collectionname)
            const querysnapshot = await studentref.get()

            // console.log(querysnapshot.size)

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
            // console.log(studentdata)
            // console.log(student)
        } else {
            console.log('no user logedd in')
        }
    } catch (error) {
        console.error(error)
    }
}