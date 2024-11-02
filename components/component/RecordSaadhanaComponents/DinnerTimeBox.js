import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from "../../assets/styles/StylesRecordSaadhana";

const DinnerTimeBox = ({dinner, setdinner, SetDinnerPoint}) => {

    const [istimePickerVisibledinnner, settimepickervisibledinnner] = useState(false)

    const showtimepickerdinner = () => {
        settimepickervisibledinnner(true)
    }

    const hidetimepickerdinner = () => {
        settimepickervisibledinnner(false)
    }

    const handleconfirmtimedinner = (selectedtime) => {
        let hours = selectedtime.getHours()
        let minutes = selectedtime.getMinutes()

        const ampm = hours >= 12 ? 'PM' : 'AM'

        hours = hours % 12
        hours = hours ? hours : 12
        let formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`
        setdinner(formattedTime)

        if (selectedtime.getHours() <= 19 && selectedtime.getHours() >= 17) {
            SetDinnerPoint(6)
            // console.log(points)
        }
        else if (selectedtime.getHours() > 19 && selectedtime.getHours() <= 21) {
            SetDinnerPoint(4)
        }
        else {
            SetDinnerPoint(2)
        }

        hidetimepickerdinner()

        // console.log(points)
    }

    return (
        <View>
            <Text style={styles.wstext}> Dinner time</Text>
            <TouchableOpacity onPress={showtimepickerdinner}>
                <TextInput
                    style={styles.inp_boxes} placeholder="select sleep time"
                    value={dinner}
                    editable={false}
                />
            </TouchableOpacity>
            {
                <DateTimePickerModal
                    isVisible={istimePickerVisibledinnner}
                    mode="time"
                    onConfirm={handleconfirmtimedinner}
                    onCancel={hidetimepickerdinner}
                />
            }

        </View>
    )
}

export default DinnerTimeBox