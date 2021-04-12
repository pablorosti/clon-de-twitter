import {db} from '../firebase/firebaseConfig';

export const deleteTweet = async id => {
    try {
        await db.collection('tweets').doc(id).delete(); 
    } catch (error) {
        console.log('error al intentar eliminar el tw')
    }
    
}