import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
      fontSize: 30,
      color: 'white'
    },
    logo: {
      height: 90,
      width: 90,
      borderRadius: 45,
      marginTop: 20
    },
    name: {
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold',
      marginTop: 5
    },
    email: {
      color: '#776863',
      fontSize: 13,
      marginTop: 5,
      marginBottom: 10
    },
    out_boxes: {
  
      backgroundColor: 'white',
      margin: 8,
      borderRadius: 20,
      alignItems: 'flex-start',
      padding: 10,
  
    },
    in_boxes: {
      backgroundColor: '#fef3ef',
      borderRadius: 20,
      width: 300,
      margin: 7,
      padding: 8,
      flexDirection: 'row'
    },
    small_logo: {
      padding: 9,
      marginTop: 10,
      resizeMode: 'cover',
      margin: 6,
      height: 10,
      width: 20
    },
    signout: {
      backgroundColor: '#dc4336',
      borderRadius: 15,
      padding: 10,
      margin: 30
    },
    profileBoxText:{ 
      color: 'black', 
      padding: 10, 
      fontWeight: 'bold', 
      fontSize: 15 
    }
  
  })

export default styles