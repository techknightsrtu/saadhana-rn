import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import styles from '../../assets/styles/StylesRecordSaadhana';

const DaySleepBox=({selectedoptiondaysleep,setselectedoptiondaysleep,setDaySleepPoints})=>{

    const optionsdaysleep = ['Not Slept', 'Less Than 1 hr', '1-1.5 hr', '1.5 - 2 hr', 'More Than 2 hr']
    const handledaysleep = (option) => {
        setselectedoptiondaysleep(option)
        switch (option) { 
            case 'Not Slept':
                setDaySleepPoints(15);
                break;
            case 'Less Than 1 hr':
                setDaySleepPoints(11);
                break;
            case '1-1.5 hr':
                setDaySleepPoints(8);
                break;
            case '1.5 - 2 hr':
                setDaySleepPoints(5);
                break;
            case 'More Than 2 hr':
                setDaySleepPoints(2);
                break;
            default:
                setDaySleepPoints(0)

        }
    }

    return(
        <View style={styles.boxes}>
        <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Day Sleep</Text>
            <Text style={{ color: '#7f7f7f', fontSize: 12, marginBottom: 5 }}>How much did you slept during the day?</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {optionsdaysleep.map((options, index) => {
                return (<TouchableOpacity
                    key={index}
                    style={[styles.tickbox, selectedoptiondaysleep === options && styles.selectedbox]}
                    onPress={() => handledaysleep(options)}
                >
                    <Text style={{ color: 'black' }}>{options}</Text>
                </TouchableOpacity>)
            })}
        </View>

    </View>
    )
}

export default DaySleepBox