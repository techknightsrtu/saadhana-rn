import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from "../../assets/styles/StylesRecordSaadhana";

const WakeTimeBox = ({waketime,setwaketime,setWakePoint}) => {
    const [istimePickerVisiblewake, settimepickervisiblewake] = useState(false)

    const showtimepickerwake = () => {
        settimepickervisiblewake(true)
    }

    const hidetimepickerwake = () => {
        settimepickervisiblewake(false)
    }

    
    
    const handleconfirmtimewake = (selectedtime) => {
        let hours = selectedtime.getHours()
        let minutes = selectedtime.getMinutes();

        const ampm = hours >= 12 ? 'PM' : 'AM'

        hours = hours % 12
        hours = hours ? hours : 12

        let formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
        setwaketime(formattedTime)

        // console.log(selectedtime.getHours())


        if (selectedtime.getHours() <= 5 && selectedtime.getHours() >= 3) {
            setWakePoint(6)
            // console.log(points)
        }
        else if (selectedtime.getHours() >= 5 && selectedtime.getHours() <= 6) {
            setWakePoint(3)
        }
        else {
            setWakePoint(0)
        }

        hidetimepickerwake()
        // console.log(wake_point)
        // console.log(points)
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.wstext} >Wake up time</Text>
            <TouchableOpacity onPress={showtimepickerwake} >
                <TextInput

                    style={styles.inp_boxes} placeholder="select sleep time"
                    value={waketime}
                    editable={false}
                />
            </TouchableOpacity>
            {
                <DateTimePickerModal
                    isVisible={istimePickerVisiblewake}
                    mode="time"
                    onConfirm={handleconfirmtimewake}
                    onCancel={hidetimepickerwake}
                />
            }
        </View>
    )
}

export default WakeTimeBox