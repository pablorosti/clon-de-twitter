import {db} from '../firebase/firebaseConfig';
import {useState, useEffect} from 'react';

export const useGetTweets = () => {
    const [tweet, getTweet] = useState([]);

    useEffect(() => {
        try {
            const unSuscribe = db.collection('tweets')
            .orderBy('fecha', 'desc')
            .onSnapshot(snapshot => {
                getTweet(snapshot.docs.map(tweet=> {
                    return {...tweet.data(), idTweet:tweet.id}
                }))
            })
            return unSuscribe;
        } catch (error) {
            console.log('error al intentar obtener los tweets')
        }
        
    }, [])

    return [tweet]
}