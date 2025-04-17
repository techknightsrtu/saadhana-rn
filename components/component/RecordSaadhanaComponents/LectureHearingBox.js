import { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from '../../assets/styles/StylesRecordSaadhana';

const LectureHearingBox = ({selectedoptionlecturehearing,setselectedoptionlecturehearing,setLectureHearingPoints}) => {

    const optionslecturehearing = ['More Than 30', '16 - 30', '5 - 15', 'Not Done']
    const handlelecturehearing = (option) => {
        setselectedoptionlecturehearing(option)
        switch (option) {
            case 'More Than 30':
                setLectureHearingPoints(10); // Assign highest points for More Than 30 minutes
                break;
            case '16 - 30':
                setLectureHearingPoints(7); // Assign points for 16 - 30 minutes
                break;
            case '5 - 15':
                setLectureHearingPoints(4); // Assign points for 5 - 15 minutes
                break;
            case 'Not Done':
                setLectureHearingPoints(0); // No points if no hearing was done
                break;
            default:
                setLectureHearingPoints(0); // Default case for safety
        }
    }
    return (
        <View style={styles.boxes}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Lecture Hearing</Text>
                <Text style={{ color: '#7f7f7f', fontSize: 12, marginBottom: 5 }}>For how long you heard Spiritual lectures?</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {optionslecturehearing.map((options, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.tickbox, selectedoptionlecturehearing === options && styles.selectedbox]}
                            onPress={() => handlelecturehearing(options)}
                        >
                            <Text style={{ color: 'black' }}>{options}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

export default LectureHearingBox