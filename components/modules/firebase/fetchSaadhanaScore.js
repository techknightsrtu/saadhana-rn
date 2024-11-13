import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { fetchCurrUserId } from './fetchCurrUserId';

export const fetchData = async ({setdata,setlabels}) => {
    try {
        const data= await fetchCurrUserId()

        if (data.userId) {
            const saadhanaRef = firestore().collection('users').doc(data.userId).collection('Saadhana');
            const snapshot = await saadhanaRef.get();

            if (snapshot.empty) {
                console.log('No matching documents in Saadhana collection.');
            } else {
                const dates = [];
                const scores = [];

                snapshot.forEach(doc => {
                    const saadhanaData = doc.data();
                    // const formattedDate = new Date(doc.id).toISOString().split('T')[0]; // Output: yyyy-mm-dd
                    const formattedDate=doc.id

                    if (saadhanaData && saadhanaData.score !== undefined && !isNaN(saadhanaData.score)) {
                        // console.log('Formatted Date:', formattedDate);
                        // console.log('Score:', saadhanaData.score);

                        dates.push(formattedDate);
                        scores.push(Number(saadhanaData.score));
                    } else {
                        console.log('Invalid or undefined score:', saadhanaData);
                    }
                });

                if (dates.length > 0 && scores.length > 0) {
                    setlabels([...dates]);  
                    setdata([...scores]); 
                }
            }
        } else {
            console.log('User not found in Firestore');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};