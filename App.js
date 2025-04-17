// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { useEffect } from 'react';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { LogBox } from 'react-native';
// import AppNavigator from './components/navigation/AppNavigator';
// import { GOOGLE_WEB_CLIENT_ID } from '@env';
// import { Provider } from 'react-redux';
// import store from './components/app/store';
// import { checkUserAuth } from './components/modules/validations/userAuthExisting';

// LogBox.ignoreAllLogs();

// const App = ({navigation}) => {
  

//   return (
//       <Provider store={store}>
//         <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
//           <NavigationContainer initialRouteName="Animation">
//             <AppNavigator />
//           </NavigationContainer>
//         </GestureHandlerRootView>
//         </Provider>
      
//   )
// }

// export default App

import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import AppNavigator from './components/navigation/AppNavigator';
import SplashScreen from './components/screens/SplashScreen'; // Lottie splash screen
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { Provider } from 'react-redux';
import store from './components/app/store';
import { checkUserAuth } from './components/modules/validations/userAuthExisting';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true); // Track splash screen visibility
  const opacity = new Animated.Value(1); // For fade-in/out effect

  useEffect(() => {
    // Hide splash screen after 3 seconds with a fade-out animation
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500, // Fade-out duration
        useNativeDriver: true,
      }).start(() => setIsSplashVisible(false)); // Hide splash after animation completes
    }, 3000); // Set timeout for splash screen to be visible

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          {isSplashVisible ? (
            <Animated.View style={{ flex: 1, opacity }}>
              <SplashScreen />
            </Animated.View>
          ) : (
            <Stack.Navigator initialRouteName="MainApp">
              <Stack.Screen
                name="MainApp"
                component={AppNavigator}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
