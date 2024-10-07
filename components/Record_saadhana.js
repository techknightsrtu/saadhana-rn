import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { ScrollView } from 'react-native-gesture-handler'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import auth from '@react-native-firebase/auth';

const Record_saadhana = () => {
    // const [text, settext] = useState('')
    const [monday, setmonday] = useState('')
    const [sunday, setsunday] = useState('')
    const [selectedDate, setSelectedDate] = useState(null);
    const [startOfWeek, setStartOfWeek] = useState(null);
    const [endOfWeek, setEndOfWeek] = useState(null);
    const [isboxselected, setisboxselected] = useState(false)
    // blank const
    const [waketime, setwaketime] = useState('')
    const [sleeptime, setsleeptime] = useState('')
    const [dinner, setdinnner] = useState('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [istimePickerVisiblewake, settimepickervisiblewake] = useState(false)
    const [istimePickerVisiblesleep, settimepickervisiblesleep] = useState(false)
    const [istimePickerVisibledinnner, settimepickervisibledinnner] = useState(false)
    // const [selectedtime,setselectedtime]=useState(new Date())

    // for day sleep
    const [selectedoptiondaysleep, setselectedoptiondaysleep] = useState(null)
    const optionsdaysleep = ['Not Slept', 'Less Than 1 hr', '1-1.5 hr', '1.5 - 2 hr', 'More Than 2 hr']
    const handledaysleep = (option) => {
        setselectedoptiondaysleep(option)
    }

    // for morning program
    const [selectedoptionmorning, setselectedoptionmorning] = useState(null)
    const optionsmorning = ['Attended', 'Partially Attended', 'Late', 'Absent']
    const handlemorningprogram = (option) => {
        setselectedoptionmorning(option)
    }

    // for no. of japa
    const [japa, setjapa] = useState('')

    // for book reading
    const [selectedoptionbookreading, setselectedoptionbookreading] = useState(null)
    const optionsbookreading = ['More Than 30', '16 - 30', '5 - 15', 'Not Done']
    const handlebookreading = (option) => {
        setselectedoptionbookreading(option)
    }

    // for lecture hearing
    const [selectedoptionlecturehearing, setselectedoptionlecturehearing] = useState(null)
    const optionslecturehearing = ['More Than 30', '16 - 30', '5 - 15', 'Not Done']
    const handlelecturehearing = (option) => {
        setselectedoptionlecturehearing(option)
    }

    // for comment
    const [comment, setcomment] = useState('Hare Krishna ! All glories to Srila Prabhupada')
    const maxchar = 300
    const prefilledtextcolor = 'black'


    // error msg
    const [errormsg, seterrormsg] = useState('')

    // saadhana_status
    const [saadhana_status, setsaadhana_status] = useState('no')

    const showtimepickerwake = () => {
        settimepickervisiblewake(true)
    }

    const hidetimepickerwake = () => {
        settimepickervisiblewake(false)
    }
    const showtimepickersleep = () => {
        settimepickervisiblesleep(true)
    }

    const hidetimepickersleep = () => {
        settimepickervisiblesleep(false)
    }

    const showtimepickerdinner = () => {
        settimepickervisibledinnner(true)
    }

    const hidetimepickerdinner = () => {
        settimepickervisibledinnner(false)
    }

    const showdatepicker = () => {
        setDatePickerVisibility(true)
    }

    const hidedatepicker = () => {
        setDatePickerVisibility(false)
    }


    const handleconfirmtimewake = (selectedtime) => {
        let hours = selectedtime.getHours()
        let minutes = selectedtime.getMinutes();

        const ampm = hours >= 12 ? 'PM' : 'AM'

        hours = hours % 12
        hours = hours ? hours : 12

        let formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
        setwaketime(formattedTime);

        hidetimepickerwake()

    }

    const handleconfirmtimesleep = (selectedtime) => {
        let hours = selectedtime.getHours()
        let minutes = selectedtime.getMinutes();

        const ampm = hours >= 12 ? 'PM' : 'AM'

        hours = hours % 12
        hours = hours ? hours : 12

        let formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`
        setsleeptime(formattedTime);

        hidetimepickersleep()

    }

    const handleconfirmtimedinner = (selectedtime) => {
        let hours = selectedtime.getHours()
        let minutes = selectedtime.getMinutes()

        const ampm = hours >= 12 ? 'PM' : 'AM'

        hours = hours % 12
        hours = hours ? hours : 12
        let formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`
        setdinnner(formattedTime)
        hidetimepickerdinner()
    }




    const handleconfirm = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).replace(',', '');
        setSelectedDate(formattedDate);
        hidedatepicker();
    }

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



    // saving saadhana to firebase
    const handlesaadhana = async () => {
        const user = auth().currentUser
        const username = user?.displayName

        if (!username) {
            console.error('no user')
            return
        }

        if (selectedDate.trim() === '' || waketime.trim() === '' || sleeptime.trim() === '' || dinner.trim() === '' || selectedoptiondaysleep.trim() === '' || selectedoptionmorning.trim() === '' || japa.trim() === '' || selectedoptionbookreading.trim() === '' || selectedoptionlecturehearing.trim() === '' || comment.trim() === '') {
            seterrormsg('All field are required')
        } else {
            seterrormsg('')
            Alert.alert('Success', 'saadhana submitted successfully!')

           
            try{
                const currentUser=auth().currentUser

                if(!currentUser){
                    console.log('no user signed in')
                }

                const usersCollection = firestore().collection('users');
                const querySnapshot = await usersCollection.where('email', '==', currentUser.email).get();
                
                let docRef
                if(!querySnapshot.empty){
                    docRef=querySnapshot.docs[0].ref
                    console.log('User exists with ID:', docRef.id)

                }else{
                    console.error('user document not found')
                }
                docRef.collection('Saadhana')
                .doc(selectedDate)
                .set({
                    date: selectedDate,
                    wake_up_time: waketime,
                    sleep_time: sleeptime,
                    dinner_time: dinner,
                    day_sleep_time: selectedoptiondaysleep,
                    morning_program: selectedoptionmorning,
                    japa_rounds: japa,
                    book_reading: selectedoptionbookreading,
                    lecture_hearing: selectedoptionlecturehearing,
                    comments: comment,
                    saadhana_status: saadhana_status

                })
                .then(() => {
                    setSelectedDate('')
                    setwaketime('')
                    setsleeptime('')
                    setdinnner('')
                    setselectedoptiondaysleep('')
                    setselectedoptionmorning('')
                    setjapa('')
                    setselectedoptionbookreading('')
                    setselectedoptionlecturehearing('')
                    setcomment('Hare Krishna ! All glories to Srila Prabhupada')
                })
                .catch((error) => {
                    console.error(error)
                })

        }catch(error){
            console.log(error)
        }

            }
               


    }

    return (
        <View style={{ flex: 1, backgroundColor: '#e59479' }}>
            {/* <TextInput
        style={{height:40,borderWidth:2,color:'black'}} placeholder='type your name here' 
        onChangeText={newtext=>settext(newtext)}
        defaultValue={text}
        />
        <Button title='submit' onPress={handlesubmit}/> */}


            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f9eae3', borderRadius: 25 }}>

                {/* shlola */}
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


                    {/* submition boxes */}


                    {/* date box */}
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

                    {/* routine check */}
                    <View style={styles.boxes}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Routine Check </Text>
                            <Text style={{ color: '#7f7f7f', fontSize: 12, marginBottom: 5 }}>Record your sleeping and eating cycle</Text>
                        </View>

                        <View style={{ flex: 1, position: 'relative', flexDirection: 'row' }}>

                            {/* wake up time, ws-> wake sleep text */}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.wstext} >Wake up time</Text>
                                <TouchableOpacity onPress={showtimepickerwake}>
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

                            {/* sleeptime */}
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
                        </View>

                        {/* dinner box */}
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

                    </View>

                    {/* day sleep */}
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

                    {/* morning program */}
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

                    {/* japa */}
                    <View style={styles.boxes}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Japa</Text>
                            <Text style={{ color: '#7f7f7f', fontSize: 12, marginBottom: 5 }}>How many rounds did you chanted?</Text>
                        </View>

                        {/* <View style={{height:50,borderWidth:1,borderColor:'#9e9e9e',borderRadius: 5,marginTop: 14,}}></View> */}
                        <View>
                            <Text style={styles.wstext}>Japa Rounds</Text>
                            <TextInput
                                style={{ height: 50, borderWidth: 1, borderColor: '#9e9e9e', borderRadius: 5, marginTop: 14, color: 'black', paddingHorizontal: 20, fontSize: 20 }}
                                keyboardType="numeric"
                                maxLength={2}
                                value={japa}
                                onChangeText={(text) => {
                                    const numericvalue = text.replace(/[^0-9]/g, '')
                                    setjapa(numericvalue)
                                }}

                            />
                        </View>
                    </View>

                    {/* book reading */}
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


                    {/* lecture hearing */}
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

                    {/* comments */}

                    <View style={styles.boxes}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Comments,If any</Text>
                            <Text style={{ color: '#7f7f7f', fontSize: 12, marginBottom: 5 }}>Write anything you want to share with your counsellor</Text>
                        </View>

                        <TextInput
                            style={[styles.comment_input, comment === 'Hare Krishna ! All glories to Srila Prabhupada' && { color: prefilledtextcolor }]}
                            multiline
                            maxLength={maxchar}
                            value={comment}
                            textAlignVertical='top'
                            selectTextOnFocus={true}
                            onChangeText={(text) => setcomment(text)}

                        // defaultValue={text}
                        />
                        <Text style={{ marginTop: 7, color: '#7f7f7f' }}>
                            {comment.length}/{maxchar}
                        </Text>
                    </View>

                    {/* save saadhana */}

                    <TouchableOpacity style={styles.savebutton} onPress={handlesaadhana}>
                        {errormsg ? <Text style={{ color: 'red', fontSize: 15, backgroundColor: 'white' }}>{errormsg}</Text> : null}
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Save Saadhana</Text>
                    </TouchableOpacity>


                </ScrollView>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    boxes: {
        backgroundColor: 'white',
        width: 330,
        borderRadius: 20,
        padding: 15,
        marginTop: 15,
        elevation: 1
        // flexDirection:'column'
    },
    shloka: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 40,
        color: '#c0755d',

    },
    inp_boxes: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#9e9e9e',
        marginTop: 14,
        borderRadius: 5,
        margin: 5,
        paddingLeft: 10,
        color: 'black',
        fontSize: 20,

    },
    wstext: {
        zIndex: 1,
        position: 'absolute',
        top: 6,
        left: 15,
        backgroundColor: 'white',
        color: 'gray',
        fontSize: 12,
        paddingHorizontal: 5
    },
    selectedbox: {
        backgroundColor: '#83f736',
        fontWeight: 'bold'
    },
    tickbox: {
        borderColor: 'black',
        borderRadius: 15,
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        margin: 5
    },
    comment_input: {
        height: 140,
        borderWidth: 1,
        borderColor: '#9e9e9e',
        borderRadius: 5,
        marginTop: 10,
        fontSize: 17
    },
    savebutton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 330,
        backgroundColor: '#b77662',
        borderRadius: 10,
        marginTop: 30,
        elevation: 1,
        marginBottom: 50

    }



})

export default Record_saadhana