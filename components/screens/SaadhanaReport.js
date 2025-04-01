import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text, ActivityIndicator } from 'react-native';
import { fetchData } from '../modules/firebase/fetchSaadhanaScore';
import GraphOfScore from '../component/SaadhanaReport/GraphOfScore';
import styles from '../assets/styles/StylesRecordSaadhana';
import { useDispatch, useSelector } from 'react-redux';
import { setDatesAndScores } from '../app/slices/GraphDataSlice';

const Saadhana_report = () => {

    // const [labels, setlabels] = useState([])
    // const [data, setdata] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const dispatch = useDispatch()
    const { dates: labels, scores: data } = useSelector(state => state.GraphData)
    console.log(labels, data)
    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                setisLoading(true);
                if (labels.length === 0 && data.length === 0) {

                    const { dates, scores } = await fetchData();
                    dispatch(setDatesAndScores({ dates, scores }));
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setisLoading(false);
            }
        };

        fetchDataAsync();

    }, [dispatch]);
    console.log("data", labels, data);
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
                <GraphOfScore labels={labels} data={data} />
            </View>

        </View>
    )
}

export default Saadhana_report