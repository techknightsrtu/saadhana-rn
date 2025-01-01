import { getAuthToken } from "../asyncStorage/getAuthToken";

export const checkUserAuth = async () => {
  try {
    const token = await getAuthToken();
    console.log("Token:", token);
    return !!token; // Returns true if token exists, false otherwise
  } catch (error) {
    console.error("Error in checkUserAuth:", error);
    return false; // Default to false on error
  }
};
