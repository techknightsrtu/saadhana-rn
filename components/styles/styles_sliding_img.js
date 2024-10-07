import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slide: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 250,
      resizeMode: 'cover',
    },
    carouselContainer: {
      marginTop: 20, 
    },
    contentContainer: {
      paddingVertical: 10, 
    },
  });

export default styles