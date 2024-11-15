import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text, ActivityIndicator } from 'react-native';
import { fetchData } from '../modules/firebase/fetchSaadhanaScore';
import GraphOfScore from '../component/SaadhanaReport/GraphOfScore';
import styles from '../assets/styles/StylesRecordSaadhana';

const Saadhana_report = () => {

    const [labels,setlabels]=useState([])
    const [data, setdata]=useState([])
    const [isLoading,setisLoading]=useState(true)

   
    useEffect(() => { 
        const fetchDataAsync=async()=>{  
            setisLoading(true) 
            await fetchData({setdata,setlabels});
            setisLoading(false)
        }

        fetchDataAsync()
        
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{color:'black',size:20}}>Loading...</Text>
            </View>
        );
    }
 
    return (
        <View style={{ flex: 1, backgroundColor: '#e59479' }}>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f9eae3', borderRadius: 25 }}>
                <GraphOfScore labels={labels} data={data} />
            </View>

        </View>
    )
}

export default Saadhana_report