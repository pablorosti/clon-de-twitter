import {db} from '../firebase/firebaseConfig';
import {useState, useEffect} from 'react';

export const useGetMessage = () => {
    const [message, setMessage] = useState([]);

    useEffect(() => {
        try {
            const unSuscribe = db.collection('mensajes')
            .orderBy('fecha', 'asc')
            .onSnapshot(snapshot => {
                setMessage(snapshot.docs.map(mensaje=> {
                    return {...mensaje.data(), idMensaje:mensaje.id}
                }))
            })
            return unSuscribe;
        } catch (error) {
            console.log('error al intentar obtener los tweets')
        }
        
    }, [])

    return [message]
}
