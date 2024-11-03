import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import DateTimePickerModal, { confirmButtonStyles } from 'react-native-modal-datetime-picker';
import styles from '../assets/styles/StylesRecordSaadhana';

const DatePicker=({selectedDate,setSelectedDate})=>{

    const [startOfWeek, setStartOfWeek] = useState(null);
    const [endOfWeek, setEndOfWeek] = useState(null);
    const [monday, setmonday] = useState('')
    const [sunday, setsunday] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        const calcweekdays = () => {
            const today = new Date()
            const dayofweek = today.getDay()
            const difftomonday = dayofweek === 0 ? -6 : 1 - dayofweek
            const currentmonday = new Date(today)
            currentmonday.setDate(today.getDate() + difftomonday)

            const currentsunday = new Date(currentmonday)
            currentsunday.setDate(currentmonday.getDate() + 6)

            setmonday(currentmonday.toLocaleDateString());
            setsunday(currentsunday.toLocaleDateString());

            setStartOfWeek(currentmonday);
            setEndOfWeek(currentsunday);
        }

        calcweekdays()
    }, [])

    const handleconfirm = (date) => {
        // Format the date to yyyy-mm-dd
        const day = String(date.getDate()).padStart(2, '0'); // Two-digit day
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Two-digit month
        const year = date.getFullYear();
        
        // Combine into ISO format (yyyy-mm-dd)
        const formattedDate = `${year}-${month}-${day}`;
        
        setSelectedDate(formattedDate);
        hidedatepicker();
    };
    

    const showdatepicker = () => {
        setDatePickerVisibility(true)
    }

    const hidedatepicker = () => {
        setDatePickerVisibility(false)
    }
    
    return(
        <View style={[{ flexDirection: 'row' }, styles.boxes]}>
        <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Saadhana Date </Text>
            <Text style={{ color: '#7f7f7f', fontSize: 13 }}>from {monday} to {sunday} </Text>
        </View>

        <TouchableOpacity style={{ flexDirection: 'column' }} onPress={showdatepicker}  >
            <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 15 }}>
                {selectedDate ? selectedDate : 'Select a Date'}
            </Text>
        </TouchableOpacity>
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleconfirm}
            onCancel={hidedatepicker}
            minimumDate={startOfWeek}
            maximumDate={endOfWeek}
        />
    </View>
    )
}

export default DatePicker