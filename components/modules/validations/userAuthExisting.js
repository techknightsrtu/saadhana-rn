import AsyncStorage from '@react-native-async-storage/async-storage'

const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken')
      return token
    } catch (error) {
      console.error(error)
      return null
    }
  }


export const checkUserAuth = async (navigation) => {
    const token = await getAuthToken()
    if (token) {
      // const storeduserinfo = await AsyncStorage.getItem('userinfo')
      // const userinfo = storeduserinfo ? JSON.parse(storeduserinfo) : null
      navigation.replace('Home')
    }
  }