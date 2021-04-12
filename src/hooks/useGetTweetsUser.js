import {db} from '../firebase/firebaseConfig';
import {useState, useEffect} from 'react';
import {useAuth} from '../context/AuthContext';

export const useGetTweetsUser = () => {
    const [tweet, getTweet] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
        try {
            const unSuscribe = db.collection('tweets')
            .where('id', '==', user.uid)
            .orderBy('fecha', 'desc')
            .onSnapshot(snapshot => {
                getTweet(snapshot.docs.map(tweet=> {
                    return {...tweet.data(), id:tweet.id}
                }))
            })
            return unSuscribe;
        } catch (error) {
            console.log('error al intentar obtener los tweets')
        }
        
    }, [user.uid])

    return [tweet]
}