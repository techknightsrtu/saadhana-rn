// File: ../assets/styles/stylesUserDetail.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Outer container for the entire page
  mainContainer: {
    flex: 1,
    backgroundColor: '#f9eae3',
    borderRadius: 25,
  },
  // Content container for the ScrollView
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 30, // More vertical padding
    paddingHorizontal: 10, // Some horizontal padding, too
    borderRadius: 25,
  },
  // New container to hold the entire form
  boxContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30, // Space after the form
  },

  /* Reusing your existing styles below */
  inputBox: {
    backgroundColor: 'white',
    width: '100%',
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
    padding: 10,
    fontSize: 20,
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
  },
});

export default styles;
