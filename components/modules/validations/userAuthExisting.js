import { getAuthToken } from "../asyncStorage/getAuthToken"

export const checkUserAuth = async (navigation) => {
    const token = await getAuthToken()
    if (token) {
      navigation.replace('Home')
    }
  }