import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePickerModal, { confirmButtonStyles } from 'react-native-modal-datetime-picker';
import { ServerContainer } from '@react-navigation/native';




const Review_saadhana = () => {

    const [currentId,setcurrentId]=useState(null)
    useEffect(()=>{

        const fetch_id=async(email)=>{
            try{
                const querySnapshot=await firestore()
                .collection('users')
                .where('email','==',email)
                .get()

                if(!querySnapshot.empty){
                    const userdoc=querySnapshot.docs[0]
                    const userdata=userdoc.data()
                    setcurrentId(userdata.userId)

                }else{
                    console.log('no user')
                }
            }catch(error){
                console.log(error)
            }
        }

        const user = auth().currentUser;
        const email=user.email
        fetch_id(email)
          
        if(currentId=='QI0vWII3CkGdS3v8GrKY'){
            setauthorization(true)
        }
        
    })
 

    const StudentComponent = ({ studentname, studentid }) => {

        const [studentdata, setstudentdata] = useState(null)
        const [username, setusername] = useState('')
        const [name, setname] = useState('')


        useEffect(() => {
            // console.log('hi') for debugging
            const fetchstudentdata = async () => {
                try {
                    const user = auth().currentUser
                    if (!user) {
                        console.log('no user signed in')
                        return
                    }

                    const username = user.displayName
                    // setusername(username)

                    const saadhanaDoc = await firestore()
                        .collection('users')
                        .doc(studentid)
                        .collection('Saadhana')
                        .doc(selectedDate)
                        .get()

                    // fetching name using studentid 
                    const StudentDoc = await firestore()
                        .collection('users')
                        .doc(studentid)
                        .get()
                    const studentname = StudentDoc.data().name
                    setname(studentname)

                    if (saadhanaDoc.exists) {
                        setstudentdata(saadhanaDoc.data())

                    } else {
                        console.log('no data')
                        // setstudentdata([])
                    }

                } catch (error) {
                    console.log(error)
                }
            }
            console.log(studentname)
            if (studentname && selectedDate) {
                fetchstudentdata()
            }
        }, [studentname, selectedDate])

        // const handlereview= async ()=>{
        //     try {

        //         await firestore()
        //         .collection(studentname)
        //         .doc(selectedDate)
        //         .update({
        //             saadhana_status:'yes'
        //         })
        //     }catch(error){
        //         console.log(error)
        //     }
        // }


        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {studentdata ? (
                    // studentdata.map((data, index) => (
                    // <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>



                    <View style={{
                        width: 320,
                        minHeight: 500,
                        backgroundColor: '#ffffff',
                        marginVertical: 10, // Space between boxes
                        borderRadius: 10,
                        elevation: 1,
                        flexShrink: 1
                    }}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'black', textAlign: 'left', fontSize: 16, fontWeight: 'bold' }}>{name}</Text>
                            <Text style={{ color: '#b0b0b0', textAlign: 'left', fontSize: 10 }}>{studentdata.date}</Text>

                            <View style={{ height: 0, backgroundColor: 'grey', borderWidth: 1, marginVertical: 10 }}></View>
                            {/* <Text style={{color:'black'}}>{JSON.stringify(data)}</Text> */}

                            {/* sadana showing */}
                            <View style={styles.saadhana_body}>
                                <View style={styles.saadhana_title}>
                                    <Text style={{ color: '#b0b0b0', textAlign: 'center' }}>Wake Up</Text>
                                    <Text style={styles.saadhana_data}>{studentdata.wake_up_time}</Text>
                                </View>

                                <View style={styles.saadhana_title}>
                                    <Text style={{ color: '#b0b0b0' }}>Sleep</Text>
                                    <Text style={styles.saadhana_data}>{studentdata.sleep_time}</Text>
                                </View>

                                <View style={styles.saadhana_title}>
                                    <Text style={{ color: '#b0b0b0' }}>Dinner</Text>
                                    <Text style={styles.saadhana_data}>{studentdata.dinner_time}</Text>
                                </View>

                                <View style={styles.saadhana_title}>
                                    <Text style={{ color: '#b0b0b0' }}>Morning{'\n'}Program</Text>
                                    <Text style={styles.saadhana_data}>{studentdata.morning_program}</Text>
                                </View>

                                <View style={styles.saadhana_title}>
                                    <Text style={{ color: '#b0b0b0', textAlign: 'center' }}>Japa{'\n'}Rounds</Text>
                                    <Text style={styles.saadhana_data}>{studentdata.japa_rounds}</Text>
                                </View>

                                <View style={styles.saadhana_title}>
                                    <Text style={{ color: '#b0b0b0', textAlign: 'center' }}>Day Sleep{'\n'}(in minutes)</Text>
                                    <Text style={styles.saadhana_data}>{studentdata.day_sleep_time}</Text>
                                </View>

                                <View style={styles.saadhana_title}>
                                    <Text style={{ color: '#b0b0b0', textAlign: 'center' }}>Reading {'\n'} (in minutes)</Text>
                                    <Text style={styles.saadhana_data}>{studentdata.book_reading}</Text>
                                </View>

                                <View style={styles.saadhana_title}>
                                    <Text style={{ color: '#b0b0b0', textAlign: 'center' }}>Hearing{'\n'}(in minutes)</Text>
                                    <Text style={styles.saadhana_data}>{studentdata.lecture_hearing}</Text>
                                </View>

                                {/* comments */}

                                <View style={styles.adjustablebox}>
                                    <Text style={{ fontSize: 15, color: 'black' }}>{studentdata.comments}</Text>
                                </View>

                                <View style={{ height: 1, width: 290, backgroundColor: 'grey', borderWidth: 1, marginVertical: 10, justifyContent: 'center' }}></View>

                                {/* mark  as reviwed */}
                                <TouchableOpacity style={styles.reviewbutton} onPress={() => handlereview}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Mark as Reviewed</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>

                    // {/* </View> */}
                    //     )
                    // )student
                ) : (
                    // <Text> no data found</Text>
                    <View style={{
                        width: 320,
                        backgroundColor: '#efefef',
                        borderRadius: 10,
                        padding: 10,
                        margin: 20,
                        minHeight: 40,
                        flexShrink: 1,
                    }}>

                        <Text style={{ color: 'black', padding: 10 }}> {name} has not filled saadhana of {selectedDate}</Text>

                    </View>
                )
                }
            </View>
        )

    }

    const [student, setstudent] = useState([])
    const [selectedOption, setselectedOption] = useState('Pending')


    // date  material
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [monday, setmonday] = useState('')
    const [sunday, setsunday] = useState('')
    const [startOfWeek, setStartOfWeek] = useState(null);
    const [endOfWeek, setEndOfWeek] = useState(null);

    const handleconfirm = (date) => {
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).replace(',', '');
        setSelectedDate(formattedDate);
        hidedatepicker();
        fetchstudent()
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

    const showdatepicker = () => {
        setDatePickerVisibility(true)
    }

    const hidedatepicker = () => {
        setDatePickerVisibility(false)
    }


    // useEffect(() => {
    const fetchstudent = async () => {
        try {
            const user = auth().currentUser

            if (user) {
                const username = user.displayName
                // setusername_(username)
                const collectionname = `${username} Counsellor`
                // console.log(collectionname)

                const studentref = firestore().collection(collectionname)
                const querysnapshot = await studentref.get()

                // console.log(querysnapshot.size)

                if (querysnapshot.empty) {
                    console.log('no under student found')
                    setstudent([])
                    return
                }

                const studentdata = querysnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setstudent(studentdata)
                // console.log(studentdata)
                console.log(student)
            } else {
                console.log('no user logedd in')
            }
        } catch (error) {
            console.error(error)
        }
    }

    // }, [])

    const handleoption = (option) => {
        setselectedOption(option)
    }

    // add email wala part 
    const [email_student, setEmail_student] = useState('')
    const [id, setid] = useState(null)
    const [name, setname] = useState(null)
    const [id_counsellor, setid_counsellor] = useState('')
    const [name_counsellor, setname_counsellor] = useState('')
    const [errormsg, seterrormsg] = useState('')
    const [errormsg_counsellor, seterrormsg_counsellor] = useState('')
    const [authorization, setauthorization] = useState(false)
    const [email_student_counsellor,set_email_student_counsellor]=useState('')

    // useEffect(()=>{
        
    // },[])

    const cancel_email = () => {
        setEmail_student('')
    }

    const add_student = async () => {

        const user = auth().currentUser
        const username = user.displayName
        const collectionname = `${username} Counsellor`
        // console.log(collectionname)

        // checking for null input
        if (email_student.trim() === '') {
            seterrormsg('Email is empty')
            return
        } else {
            seterrormsg('')
        }

        // first finding under user and taking all data
       
        try {
            const usercollection = firestore().collection('users')
            const querySnapshot = await usercollection.where('email', '==', email_student).get()

            if (!querySnapshot.empty) {
                querySnapshot.forEach((documentsnapShot) => {
                    const data = documentsnapShot.data()
                    setid(data.userId)
                    setname(data.name)
                    console.log(data)

                })
            } else {
                console.log('no such user')
                Alert.alert('Error', 'No user found with this email.')
                return
            }
        } catch (error) {
            console.log(error)
        }

        // setting id,name under that counsellor
        try {
            const counselorCollection = firestore().collection(collectionname)
            const studentDoc = await counselorCollection.get()
            let studentexist=false
            
            studentDoc.forEach((doc)=>{
                const studentdata=doc.data()
                if (studentdata.id===id){
                    
                    studentexist=true
                }
            })
            
            if (studentexist) {
                Alert.alert('This student is already under you.')
                setEmail_student('')

            } else {
                await counselorCollection.doc(id).set({
                    id: id,
                    name: name
                })

                Alert.alert('Success', 'student is added under you.')
                setEmail_student('')
                
            }
        } catch (error) {
            console.log(error)
        }

    }

    // counsellor part
    const cancel_email_counsellor = () => {
        set_email_student_counsellor('')
    }

    const add_student_counsellor=async()=>{

        // checking for null input
        if (email_student_counsellor.trim() === '') {
            seterrormsg_counsellor('Email is empty')
            return
        } else {
            seterrormsg_counsellor('')
        }

        // first finding under user and taking all data
        try {
            const usercollection = firestore().collection('users')
            const querySnapshot = await usercollection.where('email', '==', email_student_counsellor).get()
            // console.log(querySnapshot)

            if (!querySnapshot.empty) {
                querySnapshot.forEach((documentsnapShot) => {
                    const data = documentsnapShot.data()
                    setid_counsellor(data.userId)
                    setname_counsellor(data.name)
                    console.log(id_counsellor)
                    
                })
            } else {
                console.log('no such user')
                Alert.alert('Error', 'No user found with this email.')
                return
            }
        } catch (error) {
            console.log(error)
        }

       

        // setting id,name under that counsellor
        try {
            const counselorCollection = firestore().collection('Counsellor')
            const studentDoc = await counselorCollection.get()
            let studentexist=false
            
            studentDoc.forEach((doc)=>{
                const studentdata=doc.data()
                if (studentdata.id===id_counsellor){
                    studentexist=true
                }
            })
            
            if (studentexist) {
                Alert.alert('This student is already counsellor.')
                set_email_student_counsellor('')

            } else {
                await counselorCollection.doc(id_counsellor).set({
                    id: id_counsellor,
                    name: name_counsellor
                })

                Alert.alert('Success', 'student is now a counsellor')
                set_email_student_counsellor('')
                
            }
        } catch (error) {
            console.log(error)
        }

    
    }

    return (

        <View style={{ flex: 1, backgroundColor: '#a486de' }}>
            <View style={{ flex: 1.6, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', padding: 20 }}>
                    {/* option 1 */}
                    <TouchableOpacity style={[styles.optionbutton,
                    selectedOption === 'Pending' && styles.selectedbutton,
                    selectedOption === 'Pending' && styles.selectedLine
                    ]} onPress={() => handleoption('Pending')} >
                        <Text style={[styles.optiontxt, selectedOption === 'Pending' && styles.selectedtxt]}>Pending</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.optionbutton, selectedOption === 'Add Members' && styles.selectedbutton, selectedOption === 'Add Members' && styles.selectedLine]} onPress={() => handleoption('Add Members')} >
                        <Text style={[styles.optiontxt, selectedOption === 'Add Members' && styles.selectedtxt]}>Add Members</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 8, borderRadius: 20, backgroundColor: '#fcf2fe' }}>
                <ScrollView style={{}}>




                    {selectedOption === 'Pending' && (

                        <View>
                            {/* date selection */}

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

                            {student.length > 0 ? (
                                student.map((student) => (
                                    Object.keys(student).map((key) => {
                                        if (key.startsWith('id')) {
                                            // console.log(student.id)
                                            return <StudentComponent key={student.id} studentname={student.id} studentid={student.id} />
                                        }
                                    })
                                ))
                            ) : (
                                null
                            )

                            }
                        </View>
                    )
                    }


                    {selectedOption === 'Add Members' && (
                      

                        <View style={{ flex: 1 }}>

                            {/* add students */}
                            <View style={[styles.boxes, { flex: 1, marginTop: 20 }]}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, }}>Add Student</Text>
                                <Text style={{ color: '#7f7f7f', fontSize: 12 }}>Add students under you!</Text>

                                <Text style={styles.textonbox} >Enter Email</Text>
                                <TouchableOpacity >
                                    <TextInput
                                        style={styles.inp_boxes} placeholder='type email here...'
                                        onChangeText={email_student => setEmail_student(email_student)}
                                        value={email_student}
                                        keyboardType='email-address'
                                    />
                                </TouchableOpacity>
                                {errormsg ? <Text style={{ color: 'red', fontSize: 15, backgroundColor: 'white' }}>{errormsg}</Text> : null}

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity style={styles.add_cancel} onPress={cancel_email}>
                                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.add_cancel} onPress={add_student}>
                                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Add</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>

                            {
                                authorization ? (
                                    <View style={[styles.boxes, { flex: 1, marginTop: 20,marginBottom:20 }]}>
                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, }}>Add Counsellor</Text>
                                        <Text style={{ color: '#7f7f7f', fontSize: 12 }}>Add Counsellor that can lead ISKCON!</Text>

                                        <Text style={styles.textonbox} >Enter Email</Text>
                                        <TouchableOpacity >
                                            <TextInput
                                                style={styles.inp_boxes} placeholder='type email here...'
                                                onChangeText={email_student_counsellor => set_email_student_counsellor(email_student_counsellor)}
                                                value={email_student_counsellor}
                                                keyboardType='email-address'
                                            />
                                        </TouchableOpacity>
                                        {errormsg_counsellor ? <Text style={{ color: 'red', fontSize: 15, backgroundColor: 'white' }}>{errormsg_counsellor}</Text> : null}

                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <TouchableOpacity style={styles.add_cancel} onPress={cancel_email_counsellor}>
                                                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Cancel</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.add_cancel} onPress={add_student_counsellor}>
                                                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Add</Text>
                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                ) : null
                            }

                        </View>
                    )
                    }






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
        elevation: 1,
        justifyContent: 'center',
        marginLeft: 13
        // alignItems:'center'
        // flexDirection:'column'
    },
    optionbutton: {
        padding: 15,
        marginHorizontal: 30
    },
    selectedbutton: {

    },
    selectedOption: {
        color: 'white'
    },
    optiontxt: {
        color: 'black',
        fontSize: 17
    },
    selectedtxt: {
        color: 'white',
        fontWeight: 'bold'
    },
    selectedLine: {
        borderBottomWidth: 3,
        borderBottomColor: 'white',
        alignSelf: 'center'

    },
    saadhana_body: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    saadhana_title: {
        width: '32%',
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    saadhana_data: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
        margin: 5
    },
    adjustablebox: {
        width: 330,
        backgroundColor: '#efefef',
        borderRadius: 10,
        padding: 10,
        margin: 2,
        minHeight: 50,
        flexShrink: 1,
    },
    reviewbutton: {
        backgroundColor: '#109e54',
        height: 45,
        width: 290,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textonbox: {
        zIndex: 1,
        position: 'absolute',
        top: 78,
        left: 35,
        backgroundColor: 'white',
        color: 'gray',
        fontSize: 12,
        paddingHorizontal: 5
    },
    inp_boxes: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#9e9e9e',
        marginTop: 30,
        borderRadius: 5,
        margin: 5,
        paddingLeft: 10,
        color: 'black',
        fontSize: 20
    },
    add_cancel: {
        height: 40,
        width: 70,
        backgroundColor: '#a486de',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        padding: 10,
        marginTop: 15,
        margin: 5
    }


})

export default Review_saadhana