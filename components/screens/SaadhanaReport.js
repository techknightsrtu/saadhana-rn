import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text, ActivityIndicator } from 'react-native';
import { fetchData } from '../modules/firebase/fetchSaadhanaScore';
import GraphOfScore from '../component/SaadhanaReport/GraphOfScore';
import styles from '../assets/styles/StylesRecordSaadhana';
import { useDispatch, useSelector } from 'react-redux';
import { setDatesAndScores } from '../app/slices/GraphDataSlice';

const Saadhana_report = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { dates, scores } = useSelector(state => state.GraphData);
    console.log(dates, scores);

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                setIsLoading(true);
                if (dates.length === 0 && scores.length === 0) {
                    const { dates: fetchedDates, scores: fetchedScores } = await fetchData();
                    dispatch(setDatesAndScores({ dates: fetchedDates, scores: fetchedScores }));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDataAsync();
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ color: 'black', fontSize: 20 }}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#e59479' }}>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f9eae3', borderRadius: 25 }}>
                <GraphOfScore labels={dates} data={scores} />
            </View>
        </View>
    );
};

export default Saadhana_report;
