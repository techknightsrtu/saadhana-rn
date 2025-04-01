import React, { useState } from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const UserDetail = () => {
    // State variables for all user details
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [institute, setInstitute] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [imageUri, setImageUri] = useState(null);

    // Function to handle image selection using react-native-image-picker
    const pickImage = () => {
        Alert.alert(
            "Select Image",
            "Choose an option",
            [
                {
                    text: "Camera",
                    onPress: () => {
                        launchCamera({ mediaType: 'photo', quality: 1 }, (response) => {
                            if (response.didCancel) {
                                console.log('User cancelled camera');
                            } else if (response.errorMessage) {
                                console.log('Camera error: ', response.errorMessage);
                            } else if (response.assets && response.assets.length > 0) {
                                setImageUri(response.assets[0].uri);
                            }
                        });
                    }
                },
                {
                    text: "Gallery",
                    onPress: () => {
                        launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
                            if (response.didCancel) {
                                console.log('User cancelled image picker');
                            } else if (response.errorMessage) {
                                console.log('ImagePicker error: ', response.errorMessage);
                            } else if (response.assets && response.assets.length > 0) {
                                setImageUri(response.assets[0].uri);
                            }
                        });
                    }
                },
                { text: "Cancel", style: "cancel" }
            ],
            { cancelable: true }
        );
    };

    // Function to handle saving the details
    const handleSave = () => {
        // Implement your save logic (e.g., send data to your backend or state management)
        console.log('User details saved', { name, mobile, institute, address, dob, imageUri });
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#e59479' }}>
        
        <View style={styles.mainContainer}>
            
            <ScrollView contentContainerStyle={styles.contentContainer}>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.shloka} >
                    सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज । {'\n'}
                    अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥{'\n'}
                </Text>
                <Text style={{
                    color: '#c0755d',
                    fontSize: 14, marginBottom: 15
                }}>श्रीमद्भगवद्गीता अध्याय 18
                    श्लोक 66</Text>
            </View>

                {/* Name Input */}
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {/* Mobile Number Input */}
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Mobile Number</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your mobile number"
                        keyboardType="phone-pad"
                        value={mobile}
                        onChangeText={setMobile}
                    />
                </View>

                {/* Current Institute Input */}
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Current Institute</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your institute"
                        value={institute}
                        onChangeText={setInstitute}
                    />
                </View>

                {/* Home Address Input */}
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Home Address</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your home address"
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>

                {/* Date of Birth Input */}
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Date of Birth</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="YYYY-MM-DD"
                        value={dob}
                        onChangeText={setDob}
                    />
                </View>

                {/* Valid ID Proof Image */}
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
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Details</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, backgroundColor: '#f9eae3', borderRadius: 25 
    },
    contentContainer: {
        alignItems: 'center',
        paddingVertical: 20,
         alignItems: 'center', borderRadius: 25
    },
    pageHeader: {
        fontSize: 24,
        color: '#333',
        marginBottom: 20,
    },
    inputBox: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
    },
    inputLabel: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    textInput: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
    },
    imagePicker: {
        height: 150,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
    },
    imagePickerText: {
        fontSize: 16,
        color: '#888',
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: '#b77662',
        width: '90%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        elevation: 2,
        marginBottom: 40,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    shloka: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
        color: '#c0755d',
    }
});

export default UserDetail;
