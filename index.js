/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';

// const Root=()=>{
//     <GestureHandlerRootView style={{flex:1,backgroundColor:'white'}}>
//         <App/>
//     </GestureHandlerRootView>
// }
AppRegistry.registerComponent(appName, () => App);
