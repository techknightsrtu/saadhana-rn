import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const fetchCurrUserId=async()=>{
    
    try {
        const currentUser = auth().currentUser
        const querySnapshot = await firestore()
            .collection('users')
            .where('email', '==', currentUser.email)
            .get()

        if (!querySnapshot.empty) {
            const userdoc = querySnapshot.docs[0]
            const userdata = userdoc.data()
            return userdata

        } else {
            console.log('no such user')
            return null
        }
    }catch(error){
        console.log(error)
        return null
    }

}