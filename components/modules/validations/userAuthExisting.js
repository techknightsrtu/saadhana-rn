import { getAuthToken } from "../asyncStorage/getAuthToken";

export const checkUserAuth = async ({ navigation }) => {
  try {
    const token = await getAuthToken();
    if (token) {
      if (navigation && typeof navigation.replace === 'function') {
        navigation.replace('Home');
      } else {
        console.error("Navigation is not defined or doesn't have a 'replace' method.");
      }
    }
  } catch (error) {
    console.error('Error in checkUserAuth:', error);
  }
};
