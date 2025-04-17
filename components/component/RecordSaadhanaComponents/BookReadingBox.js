import { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from '../../assets/styles/StylesRecordSaadhana';

const BookReadingBox=({selectedoptionbookreading,setselectedoptionbookreading,setBookReadingPoints})=>{

    const optionsbookreading = ['More Than 30', '16 - 30', '5 - 15', 'Not Done']
    const handlebookreading = (option) => {
        setselectedoptionbookreading(option)
        switch (option) {
            case 'More Than 30':
                setBookReadingPoints(15); // Assign the highest points for More Than 30 minutes
                break;
            case '16 - 30':
                setBookReadingPoints(11); // Assign points for 16 - 30 minutes
                break;
            case '5 - 15':
                setBookReadingPoints(8); // Assign points for 5 - 15 minutes
                break;
            case 'Not Done':
                setBookReadingPoints(2); // Assign no points if no reading is done
                break;
            default:
                setBookReadingPoints(0); // Default case for safety
        }

    }

    return(
        <View style={styles.boxes}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Book Reading</Text>
                            <Text style={{ color: '#7f7f7f', fontSize: 12, marginBottom: 5 }}>For how long did you read SP books?</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {optionsbookreading.map((options, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.tickbox, selectedoptionbookreading === options && styles.selectedbox]}
                                        onPress={() => handlebookreading(options)}
                                    >
                                        <Text style={{ color: 'black' }}>{options}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
    )
}

export default BookReadingBox