import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveuserinfo = async (userinfo) => {
    try {
      await AsyncStorage.setItem('userinfo', JSON.stringify(userinfo))
    } catch (error) {
      console.error(error)
    }
  }