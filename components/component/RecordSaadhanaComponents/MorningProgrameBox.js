import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import styles from '../../assets/styles/StylesRecordSaadhana';

const MorningProgrameBox = ({selectedoptionmorning,setselectedoptionmorning,setMorningProgramPoints}) => {

    const optionsmorning = ['Attended', 'Partially Attended', 'Late', 'Absent']
    const handlemorningprogram = (option) => {
        setselectedoptionmorning(option)
        switch (option) {
            case 'Attended':
                setMorningProgramPoints(15); // Maximum points for full attendance
                break;
            case 'Partially Attended':
                setMorningProgramPoints(11); // Points for partial attendance
                break;
            case 'Late':
                setMorningProgramPoints(8); // Points for being late
                break;
            case 'Absent':
                setMorningProgramPoints(2); // No points for absence
                break;
            default:
                setMorningProgramPoints(0); // Default case, no points
        }
    }


    return (
        <View style={styles.boxes}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Morning Program</Text>
                <Text style={{ color: '#7f7f7f', fontSize: 12, marginBottom: 5 }}>Did you attend Mangala aarti and Japa Session</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {optionsmorning.map((options, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.tickbox, selectedoptionmorning === options && styles.selectedbox]}
                            onPress={() => handlemorningprogram(options)}
                        >
                            <Text style={{ color: 'black' }}>{options}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

export default MorningProgrameBox