import styles from "../../assets/styles/StylesRecordSaadhana"
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import DateTimePickerModal, { confirmButtonStyles } from 'react-native-modal-datetime-picker';
import React from "react";

const SleepTimeBox = ({sleeptime,setsleeptime,setSleepPoint}) => {

    const [istimePickerVisiblesleep, settimepickervisiblesleep] = useState(false)

    const showtimepickersleep = () => {
        settimepickervisiblesleep(true) 
    }

    const hidetimepickersleep = () => {
        settimepickervisiblesleep(false)
    }

    const handleconfirmtimesleep = (selectedtime) => {
        let hours = selectedtime.getHours()
        let minutes = selectedtime.getMinutes();

        const ampm = hours >= 12 ? 'PM' : 'AM'

        hours = hours % 12
        hours = hours ? hours : 12

        let formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`
        setsleeptime(formattedTime);
        



        if (selectedtime.getHours() <= 22 && selectedtime.getHours() >= 21) {
            setSleepPoint(6)
            // console.log(points)
        }
        else if (selectedtime.getHours() > 22 && selectedtime.getHours() <= 23) {
            setSleepPoint(4)
        }
        else {
            setSleepPoint(2)
        }

        hidetimepickersleep()

        // console.log(points)



    }
    // console.log(sleeptime)
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.wstext} >Sleep time</Text>
            <TouchableOpacity onPress={showtimepickersleep}>
                <TextInput

                    style={styles.inp_boxes} placeholder="select sleep time"
                    value={sleeptime}
                    editable={false}
                />
            </TouchableOpacity>
            {
               
                <DateTimePickerModal
                    isVisible={istimePickerVisiblesleep}
                    mode="time"
                    onConfirm={handleconfirmtimesleep}
                    onCancel={hidetimepickersleep}
                />
                
            }
        </View>
    )
}

export default SleepTimeBox