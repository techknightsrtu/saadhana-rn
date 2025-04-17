import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveAuthToken = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token)
    } catch (error) {
      console.error(error)
    }
  }