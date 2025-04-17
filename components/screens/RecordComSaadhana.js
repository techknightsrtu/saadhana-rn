
import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../assets/styles/StylesRecordSaadhana';
import WakeTimeBox from '../component/RecordSaadhanaComponents/WakeTimeBox';
import SleepTimeBox from '../component/RecordSaadhanaComponents/SleepTimeBox';
import DinnerTimeBox from '../component/RecordSaadhanaComponents/DinnerTimeBox'
import DaySleepBox from '../component/RecordSaadhanaComponents/DaySleepBox';
import MorningProgrameBox from '../component/RecordSaadhanaComponents/MorningProgrameBox';
import JapaBox from '../component/RecordSaadhanaComponents/JapaBox';
import BookReadingBox from '../component/RecordSaadhanaComponents/BookReadingBox';
import LectureHearingBox from '../component/RecordSaadhanaComponents/LectureHearingBox';
import CommentBox from '../component/RecordSaadhanaComponents/CommentBox';
import { handlesaadhana } from '../modules/firebase/SaveSaadhana';
import React from 'react';
import { fetchStudentSaadhana } from '../modules/firebase/fetchStudentSaadhana';
import { fetchCurrUserId } from '../modules/firebase/fetchCurrUserId';
import { setStudentDatainUI } from '../component/RecordSaadhanaComponents/setStudentDatainUI';
import { setUserId } from '../app/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setSaadhanaData } from '../app/slices/RecordSaadhanaSlice';


const RecordComSaadhana = ({ route }) => {
    const { selectedDate } = route.params
    
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.userId)
    const studentdata = useSelector(state => state.RecordSaadhana.saadhanaData)

    useEffect(() => {
        const checkExistingData = async () => {
            if (userId == null) {
                const data = await fetchCurrUserId()
                dispatch(setUserId(data.userId))
            }

            const saadhanaData = await fetchStudentSaadhana({ userId, selectedDate });
            dispatch(setSaadhanaData(saadhanaData));

        }

        checkExistingData()
    }, [])
    console.log(studentdata)
    useEffect(() => {
        if (studentdata && Object.keys(studentdata).length > 0) {
            setStudentDatainUI({ studentdata, setwaketime, setsleeptime, setdinner, setselectedoptiondaysleep, setselectedoptionmorning, setjapa, setselectedoptionbookreading, setselectedoptionlecturehearing, setcomment })
        }
    }, [studentdata])

      
    // blank const
    const [waketime, setwaketime] = useState('')
    const [sleeptime, setsleeptime] = useState('')
    const [dinner, setdinner] = useState('')

    const [WakePoint, setWakePoint] = useState(0)
    const [SleepPoint, setSleepPoint] = useState(0)
    const [DinnerPoint, SetDinnerPoint] = useState(0)

    // const [selectedtime,setselectedtime]=useState(new Date())

    // points 
    const [points, setpoints] = useState(0)

    // for day sleep
    const [selectedoptiondaysleep, setselectedoptiondaysleep] = useState(null)
    const [DaySleepPoints, setDaySleepPoints] = useState(0);


    // for morning program
    const [selectedoptionmorning, setselectedoptionmorning] = useState(null)
    const [MorningProgramPoints, setMorningProgramPoints] = useState(0);


    // for no. of japa
    const [japa, setjapa] = useState('')
    const [japaPoints, setJapaPoints] = useState(0); // State to store Japa points


    // for book reading
    const [selectedoptionbookreading, setselectedoptionbookreading] = useState(null)
    const [bookReadingPoints, setBookReadingPoints] = useState(0);

    // for lecture hearing
    const [selectedoptionlecturehearing, setselectedoptionlecturehearing] = useState(null)
    const [lectureHearingPoints, setLectureHearingPoints] = useState(0);

    // for comment
    const [comment, setcomment] = useState('Hare Krishna ! All glories to Srila Prabhupada')

    // error msg
    const [errormsg, seterrormsg] = useState('')

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

                    {/* routine check */}
                    <View style={styles.boxes}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Routine Check </Text>
                            <Text style={{ color: '#7f7f7f', fontSize: 12, marginBottom: 5 }}>Record your sleeping and eating cycle</Text>
                        </View>

                        <View style={{ flex: 1, position: 'relative', flexDirection: 'row' }}>

                            {/* wake up time, ws-> wake sleep text */}
                            <WakeTimeBox waketime={waketime} setwaketime={setwaketime} setWakePoint={setWakePoint} />

                            {/* sleeptime */}
                            <SleepTimeBox sleeptime={sleeptime} setsleeptime={setsleeptime} setSleepPoint={setSleepPoint} />

                        </View>

                        {/* dinner box */}
                        <DinnerTimeBox dinner={dinner} setdinner={setdinner} SetDinnerPoint={SetDinnerPoint} />

                    </View>

                    {/* day sleep */}
                    <DaySleepBox selectedoptiondaysleep={selectedoptiondaysleep} setselectedoptiondaysleep={setselectedoptiondaysleep} setDaySleepPoints={setDaySleepPoints} />

                    {/* morning program */}
                    <MorningProgrameBox selectedoptionmorning={selectedoptionmorning} setselectedoptionmorning={setselectedoptionmorning} setMorningProgramPoints={setMorningProgramPoints} />

                    {/* japa */}
                    <JapaBox japa={japa} setjapa={setjapa} setJapaPoints={setJapaPoints} />

                    {/* book reading */}
                    <BookReadingBox selectedoptionbookreading={selectedoptionbookreading} setselectedoptionbookreading={setselectedoptionbookreading} setBookReadingPoints={setBookReadingPoints} />


                    {/* lecture hearing */}
                    <LectureHearingBox selectedoptionlecturehearing={selectedoptionlecturehearing} setselectedoptionlecturehearing={setselectedoptionlecturehearing} setLectureHearingPoints={setLectureHearingPoints} />

                    {/* comments */}
                    <CommentBox comment={comment} setcomment={setcomment} />


                    {/* save saadhana */}

                    <TouchableOpacity style={styles.savebutton} onPress={() => handlesaadhana(selectedDate, waketime, sleeptime, dinner, selectedoptiondaysleep, selectedoptionmorning, japa, selectedoptionbookreading, selectedoptionlecturehearing, comment, WakePoint, SleepPoint, DinnerPoint, DaySleepPoints, MorningProgramPoints, japaPoints, bookReadingPoints, lectureHearingPoints, seterrormsg, setwaketime, setsleeptime, setdinner, setselectedoptiondaysleep, setselectedoptionmorning, setjapa, setselectedoptionbookreading, setselectedoptionlecturehearing, setcomment)}>
                        {errormsg ? <Text style={{ color: 'red', fontSize: 15, backgroundColor: 'white' }}>{errormsg}</Text> : null}
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Save Saadhana</Text>
                    </TouchableOpacity>

                </ScrollView>


            </View>

        </View>
    )
}


export default RecordComSaadhana
