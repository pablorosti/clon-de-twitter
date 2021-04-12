import {db} from './firebaseConfig';

export const removeRetweet = async (id, retweet) => {
    await db.collection('tweets').doc(id).update({retweet: retweet - 1})
}