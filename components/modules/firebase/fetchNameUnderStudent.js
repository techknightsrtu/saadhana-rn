import firestore from '@react-native-firebase/firestore';

export const fetchNameUnderStudent = async ({ userId }) => {
    
    const StudentDoc = await firestore()
        .collection('users')
        .doc(userId)
        .get();
    if (!StudentDoc.exists) {
        throw new Error(`Document with ID ${userId} does not exist.`);
    }
    const studentname = StudentDoc.data()?.name;
    if (!studentname) {
        throw new Error(`No 'name' field found in document ${userId}.`);
    }
    return studentname;
};
