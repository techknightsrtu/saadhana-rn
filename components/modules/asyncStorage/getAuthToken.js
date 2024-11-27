import AsyncStorage from '@react-native-async-storage/async-storage'

export const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken')
      return token
    } catch (error) {
      console.error(error)
      return null
    }
  }