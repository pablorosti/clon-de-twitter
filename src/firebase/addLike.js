import {db} from './firebaseConfig';

export const addLike = async (id, likes) => {
    await db.collection('tweets').doc(id).update({likes: likes + 1})
}