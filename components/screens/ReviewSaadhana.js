import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Alert, Modal } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePickerModal, { confirmButtonStyles } from 'react-native-modal-datetime-picker';
import { ServerContainer } from '@react-navigation/native';
import { SuperAdminCheck } from '../modules/firebase/SuperAdminCheck';
import DatePicker from '../component/DatePicker';
import { fetchUnderStudent } from '../modules/firebase/fetchUnderStudent';
import styles from '../assets/styles/StylesReviewSaadhana'
import { add_student } from '../modules/firebase/setStudentChild';
import { add_student_counsellor } from '../modules/firebase/setStudentCounsellor';
import { fetchStudentSaadhana } from '../modules/firebase/fetchStudentSaadhana';

import SaadhanaBoxes from '../component/ReviewSaadhana/SaadhanaBoxes';

const Review_saadhana = () => {

    const [authorization, setauthorization] = useState(false)

    useEffect(() => {
        const checkAuthorization = async () => {
            const isAuthorized = await SuperAdminCheck();
            setauthorization(isAuthorized);
        };

        checkAuthorization();
    }, [])


    const StudentComponent = ({ studentname, studentid }) => {
        // console.log(studentname)
        // console.log(studentid)
        const [studentdata, setstudentdata] = useState(null)
        const [username, setusername] = useState('')
        const [name, setname] = useState('')
        const [modalVisible, setmodalVisible] = useState(false)

        useEffect(() => {

            // console.log(studentname)
            if (studentname && selectedDate) {
                fetchStudentSaadhana({ studentid, selectedDate, setname, setstudentdata })
            }
        }, [studentname, selectedDate])

        return(
            <SaadhanaBoxes studentdata={studentdata} name={name} setmodalVisible={setmodalVisible} modalVisible={modalVisible} studentid={studentid} selectedDate={selectedDate} />
        )

    }

    const [student, setstudent] = useState([])
    const [selectedOption, setselectedOption] = useState('Pending')


    // date  material
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (selectedDate) {
            console.log('going to fetch studentdata')
            fetchUnderStudent({ setstudent })
        }
    }, [selectedDate])
    // console.log(student)


    const handleoption = (option) => {
        setselectedOption(option)
    }

    // add email wala part 
    const [email_student, setEmail_student] = useState('')
    const [errormsg, seterrormsg] = useState('')
    const [errormsg_counsellor, seterrormsg_counsellor] = useState('')

    const [email_student_counsellor, set_email_student_counsellor] = useState('')

    const cancel_email = () => {
        setEmail_student('')
    }

    // counsellor part
    const cancel_email_counsellor = () => {
        set_email_student_counsellor('')
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
                            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                            {student.length > 0 ? (
                                student.map((student) => (
                                    Object.keys(student).map((key) => {
                                        if (key.startsWith('id')) {
                                            // console.log(student.id)
                                            return <StudentComponent studentname={student.id} studentid={student.id} />
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
                                    <TouchableOpacity style={styles.add_cancel} onPress={() => add_student({ seterrormsg, email_student, setEmail_student })}>
                                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Add</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>

                            {
                                authorization ? (
                                    <View style={[styles.boxes, { flex: 1, marginTop: 20, marginBottom: 20 }]}>
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
                                            <TouchableOpacity style={styles.add_cancel} onPress={() => add_student_counsellor({ email_student_counsellor, set_email_student_counsellor, seterrormsg_counsellor })}>
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

export default Review_saadhana