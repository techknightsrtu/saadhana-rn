// this is taking data from login ppage and helping to show profile image
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchuserinfo = async (setuserinfo_) => {
    try {
      const storeduserinfo = await AsyncStorage.getItem('userinfo')
      if (storeduserinfo) {
        setuserinfo_(JSON.parse(storeduserinfo))
      } 
    }
    catch (error) {
      console.error(error)
    }
  }