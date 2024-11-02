import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text } from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const Saadhana_report = () => {

    const [labels,setlabels]=useState([])
    const [data, setdata]=useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentEmail = firebase.auth().currentUser.email;
                let matchedId = null;
    
                const userRef = firestore().collection('users');
                const usersnapshot = await userRef.where('email', '==', currentEmail).get();
    
                if (!usersnapshot.empty) {
                    usersnapshot.forEach(doc => {
                        matchedId = doc.id;
                    });
                }
    
                if (matchedId) {
                    const saadhanaRef = firestore().collection('users').doc(matchedId).collection('Saadhana');
                    const snapshot = await saadhanaRef.get();
    
                    if (snapshot.empty) {
                        console.log('No matching documents in Saadhana collection.');
                    } else {
                        const dates = [];
                        const scores = [];
    
                        snapshot.forEach(doc => {
                            const saadhanaData = doc.data();
                            const formattedDate = new Date(doc.id).toISOString().split('T')[0]; // Output: yyyy-mm-dd

    
                            if (saadhanaData && saadhanaData.score !== undefined && !isNaN(saadhanaData.score)) {
                                console.log('Formatted Date:', formattedDate);
                                console.log('Score:', saadhanaData.score);
    
                                dates.push(formattedDate);
                                scores.push(Number(saadhanaData.score));
                            } else {
                                console.log('Invalid or undefined score:', saadhanaData);
                            }
                        });
    
                        if (dates.length > 0 && scores.length > 0) {
                            setlabels([...dates]);  // Update state with dates
                            setdata([...scores]);  // Update state with scores
                        }
                    }
                } else {
                    console.log('User not found in Firestore');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    // useEffect(() => {
    //     console.log('Updated Labels:', labels);  // This will log when labels change
    //     console.log('Updated Data:', data);  // This will log when data changes
    // }, [labels, data])
 
    return (
        <View style={{ flex: 1, backgroundColor: '#e59479' }}>

            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f9eae3', borderRadius: 25 }}>
                <View>
                    {labels.length>0 && data.length>0?(<LineChart
                        data={{
                            labels:labels,
                            datasets: [
                                {
                                    data:data
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width-30} // from react-native
                        height={220}
                        yAxisLabel=""
                        

                        yAxisSuffix=" pts"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                                
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            marginTop:40
                        }}
                    />):(null)}
                    
                </View>
            </View>

        </View>
    )
}

export default Saadhana_report