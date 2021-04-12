import {useState, useEffect} from 'react';
import {db} from '../firebase/firebaseConfig';

export const useGetTweetForId = (id) => {

    const [tweet, setTweet] = useState({});

    useEffect(() => {
        db.collection('tweets').doc(id).get()
            .then((doc) => {
                setTweet({...doc.data(), idTweet:doc.id})
            })
    }, [id])

    return [tweet];
}