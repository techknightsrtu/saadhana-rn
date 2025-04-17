// this is used to check if the login user is counsellor or not on that basis we have to manage we have to show 
// button or not

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


// for button
// useEffect(()=>{
export const checkuseraccess = async (setshowbutton) => {
    try {
        const user = auth().currentUser
        if (user) {
            const loggeduser = user.displayName

            const counsellor = firestore().collection('Counsellor')
            const querysnapshot = await counsellor.get()
            let iscounsellor = false

            querysnapshot.forEach((doc) => {
                const data = doc.data()
                // console.log(doc.id)
                if (data.name === loggeduser) {

                    iscounsellor = true
                }
            })

            setshowbutton(iscounsellor)
        }
    } catch (error) {
        console.error(error)
    }
}

//   },[])