import { ComposedGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition";

export const DateCompare = (WeekDays, SaadhanaDates) => {
   
  
    const resultArray = WeekDays.map(date =>
      SaadhanaDates.includes(date) ? 'Filled' : 'Not Filled'
    );
    // console.log(resultArray)
    return resultArray;
  }
  