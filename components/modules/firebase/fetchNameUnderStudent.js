import firestore from '@react-native-firebase/firestore';

export const fetchNameUnderStudent = async ({ studentid }) => {
    const StudentDoc = await firestore()
        .collection('users')
        .doc(studentid)
        .get()
    const studentname = StudentDoc.data().name
    console.log(studentname)
    return (studentname)
    console.log('hi')
}