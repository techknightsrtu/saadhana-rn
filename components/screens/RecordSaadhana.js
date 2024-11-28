import { useCallback, useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import styles from '../assets/styles/StylesRecordSaadhana';
import { CurrWeekDays } from '../component/RecordSaadhanaComponents/CurrWeekDates';
import { DateCompare } from '../modules/SaadhanaStatus/DateCompare';
import fetchSaadhanaDates from '../modules/firebase/fetchSaadhanaDates';
import { useFocusEffect } from '@react-navigation/native';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setWeekDates } from '../app/slices/RecordSaadhanaSlice';
import { setSaadhanaDates } from "../app/slices/RecordSaadhanaSlice";
import { setSaadhanaStatus } from "../app/slices/RecordSaadhanaSlice";


const Record_saadhana = ({ navigation }) => {

    const dispatch = useDispatch()
    const WeekDays=useSelector((state)=>state.RecordSaadhana.weekDates)
    const SaadhanaDates=useSelector((state)=>state.RecordSaadhana.saadhanaDates)
    const SaadhanaStatus=useSelector((state)=>state.RecordSaadhana.saadhanaStatus)

    const [isLoading, setisLoading] = useState(true)

    EditArray = Array(7).fill('Edit')

    const weekDateExtract = async () => {
        if (WeekDays.length === 0) {
            const weekDates = CurrWeekDays()
            dispatch(setWeekDates(weekDates))
        }

            const saadhanaDates = await fetchSaadhanaDates()
            dispatch(setSaadhanaDates(saadhanaDates))
           
    }

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                setisLoading(true)
                await weekDateExtract()
                setisLoading(false)
            }
            loadData()
        }, [])
    )

    useEffect(() => {
        if (WeekDays.length > 0 && SaadhanaDates.length > 0) {
            
                const statusArray = DateCompare(WeekDays, SaadhanaDates)
                dispatch(setSaadhanaStatus(statusArray))      
         
        }
    }, [SaadhanaDates, WeekDays])

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ color: 'black', size: 20 }}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#e59479' }}>

            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f9eae3', borderRadius: 25 }}>

                {/* shloka */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.shloka} >
                            युक्ताहारविहारस्य युक्तचेष्टस्य कर्मसु । {"\n"}
                            युक्तस्वप्‍नावबोधस्य योगो भवति दु:खहा ॥ {"\n"}
                        </Text>
                        <Text style={{
                            color: '#c0755d',
                            fontSize: 14, marginBottom: 10
                        }}>श्रीमद्भगवद्गीता अध्याय 6
                            श्लोक 17</Text>
                    </View>

                    <View style={[{ flexDirection: 'row' }, styles.boxes]}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Saadhana Data </Text>
                            <Text style={{ color: '#7f7f7f', fontSize: 13 }}>from {WeekDays[0]} to {WeekDays[6]} </Text>
                        </View>

                    </View>

                    <View style={styles.boxes}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 4 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Date</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17, right: 120 }}>Status</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <FlatList

                                data={WeekDays}
                                renderItem={({ item }) => <Text style={styles.dates}>{item}</Text>}
                            />

                            <FlatList
                                data={SaadhanaStatus}
                                renderItem={({ item }) => <Text style={styles.dates}>{item}</Text>}
                            />
                            <FlatList
                                style={{ left: 15 }}
                                data={EditArray}
                                renderItem={({ item, index }) => <TouchableOpacity onPress={() => { navigation.navigate('RecordComSaadhana', { selectedDate: WeekDays[index] }) }} >
                                    <Text style={styles.edit}>{item}</Text>
                                </TouchableOpacity>
                                }
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Record_saadhana