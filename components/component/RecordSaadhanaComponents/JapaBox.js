import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import styles from '../../assets/styles/StylesRecordSaadhana';


const JapaBox=({japa,setjapa,setJapaPoints})=>{

     return(
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
                                    const japaRounds = parseInt(numericvalue, 10) || 0; // Handle non-numeric values
                                    if (japaRounds >= 16) {
                                        setJapaPoints(15); // Highest points for 16 or more rounds
                                    } else if (japaRounds >= 12 && japaRounds < 16) {
                                        setJapaPoints(12); // Points for 12 to 15 rounds
                                    } else if (japaRounds >= 8 && japaRounds < 12) {
                                        setJapaPoints(10); // Points for 8 to 11 rounds
                                    } else if (japaRounds >= 4 && japaRounds < 8) {
                                        setJapaPoints(8); // Points for 4 to 7 rounds
                                    } else if (japaRounds >= 1 && japaRounds < 4) {
                                        setJapaPoints(6);
                                    } else {
                                        setJapaPoints(0)
                                    }
                                }}

                            />
                        </View>
                    </View>
     )
}

export default JapaBox 