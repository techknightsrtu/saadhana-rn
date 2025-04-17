// components/screens/SplashScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/splashScreenAnimation.json')} // Adjust path as needed
        autoPlay
        loop={false} // No looping for splash screen
        style={styles.animation}
      />
      
      <Text style={styles.text}>Hare Krishna</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E59478', // Set background color
  },
  animation: {
    width: 300,
    height: 300,
  },
  text: {
    marginTop: 20, 
    fontSize: 40, 
    fontWeight: 'bold', 
    color: '#000', 
  },
});

export default SplashScreen;
