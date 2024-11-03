import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { fetchData } from '../modules/firebase/fetchSaadhanaScore';
import GraphOfScore from '../component/SaadhanaReport/GraphOfScore';

const Saadhana_report = () => {

    const [labels,setlabels]=useState([])
    const [data, setdata]=useState([])

    useEffect(() => {    
        fetchData({setdata,setlabels});
    }, []);
 
    return (
        <View style={{ flex: 1, backgroundColor: '#e59479' }}>

            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f9eae3', borderRadius: 25 }}>
                <GraphOfScore labels={labels} data={data} />
            </View>

        </View>
    )
}

export default Saadhana_report