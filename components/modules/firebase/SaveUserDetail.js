// File: ../../modules/firebase/SaveUserDetail.js
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const handleSaveUserDetail = async (
  name,
  mobile,
  institute,
  address,
  dob,
  imageUri,
  userData // <-- Pass userData as additional parameter
) => {
  try {
    if (!userData || !userData.userId) {
      Alert.alert('Error', 'Could not fetch user details. Please try again.');
      return;
    }

    const uid = userData.userId;
    let imageUrl = userData.validIdProofUrl || null;

    // Only upload if a new image is selected and it's different from the existing image URL
    if (imageUri && imageUri !== imageUrl) {
      const reference = storage().ref(`valid_id_proofs/${uid}.jpg`);
      await reference.putFile(imageUri);
      imageUrl = await reference.getDownloadURL();
    }

    const userDetails = {
      name,
      mobile,
      institute,
      address,
      dob,
      validIdProofUrl: imageUrl,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };

    await firestore().collection('users').doc(uid).set(userDetails, { merge: true });
    Alert.alert('Success', 'User details saved successfully!');
  } catch (error) {
    console.error('Error saving user details:', error);
    Alert.alert('Error', 'Failed to save details. Please try again.');
  }
};
