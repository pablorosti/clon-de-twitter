import {db} from './firebaseConfig';

export const addRetweet = async (id, retweet) => {
    await db.collection('tweets').doc(id).update({retweet: retweet + 1})
}