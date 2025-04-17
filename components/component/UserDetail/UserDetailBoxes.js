// File: ../component/UserDetail/UserDetailBoxes.js
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import { fetchCurrUserId } from '../../modules/firebase/fetchCurrUserId';
import styles from '../../assets/styles/stylesUserDetail';
import { handleSaveUserDetail } from '../../modules/firebase/SaveUserDetail';

const UserDetailBox = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [institute, setInstitute] = useState('');
  const [address, setAddress] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [dob, setDob] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchCurrUserId();
      if (data) {
        setUserData(data);
      }
    };
    loadUserData();
  }, []);

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selectedDate) {
      setDob(moment(selectedDate).format('DD-MM-YYYY'));
    }
  };

  const pickImage = () => {
    Alert.alert('Select Image', 'Choose an option', [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera({ mediaType: 'photo', quality: 1 }, (response) => {
            if (!response.didCancel && !response.errorMessage && response.assets?.length > 0) {
              setImageUri(response.assets[0].uri);
            }
          });
        }
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
            if (!response.didCancel && !response.errorMessage && response.assets?.length > 0) {
              setImageUri(response.assets[0].uri);
            }
          });
        }
      },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  return (
    <View style={styles.boxContainer}>
      {/* Name */}
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      </View>

      {/* Mobile */}
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Mobile Number</Text>
        <TextInput
          style={styles.textInput}
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          placeholder="Enter your mobile number"
        />
      </View>

      {/* Institute */}
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Current Institute</Text>
        <TextInput
          style={styles.textInput}
          value={institute}
          onChangeText={setInstitute}
          placeholder="Enter your institute"
        />
      </View>

      {/* Address */}
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Home Address</Text>
        <TextInput
          style={styles.textInput}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your home address"
        />
      </View>

      {/* DOB */}
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Date of Birth</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <TextInput
            style={styles.textInput}
            value={dob}
            editable={false}
            placeholder="dd-mm-yyyy"
            pointerEvents="none"
          />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onChange}
            maximumDate={new Date()}
          />
        )}
      </View>

      {/* ID Proof */}
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Valid ID Proof Image</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.selectedImage} />
          ) : (
            <Text style={styles.imagePickerText}>Select Image</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() =>
          handleSaveUserDetail(
            name,
            mobile,
            institute,
            address,
            dob,
            imageUri,
            userData // Pass the userData along!
          )
        }
      >
        <Text style={styles.saveButtonText}>Save Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserDetailBox;
