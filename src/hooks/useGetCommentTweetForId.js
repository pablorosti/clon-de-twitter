import {useState, useEffect} from 'react';
import {db} from '../firebase/firebaseConfig';

export const useGetCommentTweetForId = (id) => {

    const [comment, setComment] = useState([]);

    useEffect(() => {
        try {
            const unSuscribe = db.collection('tweets')
                    .doc(id)
                    .collection('comentario')
                    .orderBy('fecha', 'desc')
                    .onSnapshot(snapshot => {
                        setComment(snapshot.docs.map((doc) => {
                            return {...doc.data(), docId:doc.id}
                        }))
                })
                return unSuscribe;
        } catch (error) {
            console.log('error el intentar recuperar los comentarios')
        }
        
            
    }, [id])

    return [comment];
}