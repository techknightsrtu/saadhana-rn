import styles from '../../assets/styles/StylesReviewSaadhana'
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Alert, Modal } from 'react-native';
import { handleFeedback } from '../../modules/firebase/SaveFeedback';

const SaadhanaBoxes = ({ studentdata, userName, setmodalVisible, modalVisible, userId, selectedDate }) => {
    const [Feedback, setFeedback] = useState("")
    if (!studentdata || Object.keys(studentdata).length === 0) {
        return (
            <View style={styles.noSadhanaBox}>

                <Text style={{ color: 'black', padding: 10 }}>{userName} has not filled saadhana of {selectedDate}</Text>

            </View>
        );
    }

    return (

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {/* {studentdata && Object.keys(studentdata).length > 0 ? ( */}


            <View style={styles.saadhanaBox}>
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'black', textAlign: 'left', fontSize: 16, fontWeight: 'bold' }}>{userName}</Text>
                            <Text style={{ color: '#b0b0b0', textAlign: 'left', fontSize: 10 }}>{studentdata.date}</Text>
                        </View>
                        <View style={{ height: 23, width: 35, borderRadius: 15, backgroundColor: '#34206a', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>{studentdata.score}</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'grey', borderWidth: 1, marginVertical: 10 }}></View>


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

                        {/* feedback*/}
                        <TouchableOpacity style={styles.reviewbutton} onPress={() => setmodalVisible(true)}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Give Feedback</Text>
                        </TouchableOpacity>

                        {/* modal feedback button */}
                        <Modal
                            animationType='slide'
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setmodalVisible(false)}
                        >
                            <View style={styles.modalBackground}>
                                <View style={styles.modalView}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginBottom: 15 }}>Send your Feedback</Text>
                                    <TextInput
                                        style={styles.feedbackBox} placeholder='type your feedback here'
                                        onChangeText={newtext => setFeedback(newtext)}
                                        defaultValue={Feedback}
                                        multiline
                                    /> 
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <TouchableOpacity style={styles.add_cancel} onPress={() => setmodalVisible(false)}>
                                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.add_cancel} onPress={() => handleFeedback({ userId, studentdata, Feedback, setFeedback, setmodalVisible })}>
                                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Send</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>

                    </View>

                </View>
            </View>


        </View>
    )
}

export default SaadhanaBoxes